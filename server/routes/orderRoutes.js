import express from 'express';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { products as memoryProducts } from '../data/productsData.js';
import { connectDB, getDbStatus } from '../config/db.js';

const router = express.Router();

// Coupon rules - must mirror client/src/context/CartContext.jsx
const COUPONS = {
  SAVE20: { code: 'SAVE20', discount: 20, type: 'percent' },
  WELCOME10: { code: 'WELCOME10', discount: 10, type: 'percent' },
  FLAT50: { code: 'FLAT50', discount: 50, type: 'flat', minOrder: 200 },
  FREESHIP: { code: 'FREESHIP', discount: 0, type: 'free_shipping' }
};
const FREE_SHIPPING_THRESHOLD = 99;
const SHIPPING_FEE = 15;
const TAX_RATE = 0.08;

const round2 = (n) => Math.round(n * 100) / 100;

const REQUIRED_CUSTOMER_FIELDS = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];

// In-memory orders store fallback (used only when no MONGODB_URI is configured)
const memoryOrders = [];

const httpError = (status, message) => Object.assign(new Error(message), { status });

// Look up authoritative product data (price, stock) - never trust prices sent by the client
const loadCatalogItems = async (ids, connected) => {
  const found = new Map();
  if (connected) {
    const docs = await Product.find({ id: { $in: ids } }).lean();
    docs.forEach(d => found.set(d.id, d));
  }
  ids.forEach(id => {
    if (!found.has(id)) {
      const mem = memoryProducts.find(p => p.id === id);
      if (mem) found.set(id, mem);
    }
  });
  return found;
};

const priceOrder = async (items, couponCode, connected) => {
  const ids = [...new Set(items.map(i => String(i.productId)))];
  const catalog = await loadCatalogItems(ids, connected);

  const pricedItems = items.map(item => {
    const product = catalog.get(String(item.productId));
    if (!product) throw httpError(400, `Unknown product: ${item.productId}`);
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw httpError(400, `Invalid quantity for ${product.name}`);
    }
    if (typeof product.stock === 'number' && quantity > product.stock) {
      throw httpError(400, `Only ${product.stock} of ${product.name} in stock`);
    }
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: item.image || product.images?.[0],
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    };
  });

  const subtotal = round2(pricedItems.reduce((acc, i) => acc + i.price * i.quantity, 0));

  let coupon = COUPONS[String(couponCode || '').trim().toUpperCase()] || null;
  if (coupon?.minOrder && subtotal < coupon.minOrder) coupon = null;

  let discountAmount = 0;
  if (coupon?.type === 'percent') discountAmount = round2((subtotal * coupon.discount) / 100);
  else if (coupon?.type === 'flat') discountAmount = Math.min(coupon.discount, subtotal);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.type === 'free_shipping';
  const shipping = isFreeShipping ? 0 : SHIPPING_FEE;
  const tax = round2((subtotal - discountAmount) * TAX_RATE);
  const total = Math.max(0, round2(subtotal - discountAmount + shipping + tax));

  return {
    items: pricedItems,
    pricing: {
      subtotal,
      shipping,
      tax,
      discountAmount,
      couponApplied: coupon?.code || '',
      total
    }
  };
};

const generateOrderId = () => `ORD-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

// GET /api/orders - Get order history (returns all orders, with optional session filter)
router.get('/', async (req, res) => {
  const { sessionId, filter } = req.query;

  try {
    await connectDB();
    const { connected } = getDbStatus();

    if (connected) {
      let orders = [];
      // Only strictly isolate if explicit filter=session is requested
      if (sessionId && filter === 'session') {
        orders = await Order.find({ sessionId }).sort({ createdAt: -1 }).lean();
      }
      // If no session-specific orders found or no strict filter, return all store orders
      if (!orders.length) {
        orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
      }
      return res.json(orders);
    }

    // In-memory fallback
    if (sessionId && filter === 'session') {
      const filtered = memoryOrders.filter(o => o.sessionId === sessionId);
      if (filtered.length) return res.json(filtered);
    }
    res.json(memoryOrders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Could not load orders' });
  }
});

// GET /api/orders/:id - Single order lookup by orderId or _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await connectDB();
    const { connected } = getDbStatus();

    if (connected) {
      const order = await Order.findOne({
        $or: [
          { orderId: id },
          { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
        ]
      }).lean();
      if (order) return res.json(order);
    }

    const memoryOrder = memoryOrders.find(o => o.orderId === id || o._id === id);
    if (!memoryOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(memoryOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { items, customer, payment, pricing, sessionId } = req.body;

    if (!Array.isArray(items) || !items.length || !customer) {
      return res.status(400).json({ error: 'Missing required order fields: items, customer' });
    }

    const missing = REQUIRED_CUSTOMER_FIELDS.filter(f => !String(customer[f] || '').trim());
    if (missing.length) {
      return res.status(400).json({ error: `Missing or invalid fields: ${missing.join(', ')}` });
    }

    await connectDB();
    const dbStatus = getDbStatus();

    // A database is configured but unreachable: fail loudly instead of
    // pretending to save (in-memory data is lost on serverless platforms).
    if (!dbStatus.connected && dbStatus.hasUri) {
      console.error(`[Order] MongoDB unavailable: ${dbStatus.lastError}`);
      return res.status(503).json({ error: 'Order database is temporarily unavailable. Please try again.' });
    }

    const priced = await priceOrder(items, pricing?.couponApplied, dbStatus.connected);

    const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder = {
      orderId: generateOrderId(),
      sessionId: sessionId ? String(sessionId) : undefined,
      items: priced.items,
      customer,
      payment: {
        method: payment?.method || 'card',
        status: 'Completed',
        transactionId: `TXN-${crypto.randomBytes(5).toString('hex').toUpperCase()}`
      },
      pricing: priced.pricing,
      status: 'Processing',
      estimatedDelivery: `Estimated Delivery by ${deliveryDate}`
    };

    if (dbStatus.connected) {
      try {
        const orderDoc = await Order.create(newOrder);
        console.log(`[Order] Saved to MongoDB Atlas: ${newOrder.orderId}`);
        return res.status(201).json(orderDoc);
      } catch (dbErr) {
        console.error(`[Order] MongoDB save failed: ${dbErr.message}`);
        if (dbErr.name === 'ValidationError') {
          const fields = Object.keys(dbErr.errors).map(f => f.replace(/^customer\./, ''));
          return res.status(400).json({ error: `Missing or invalid fields: ${fields.join(', ')}` });
        }
        return res.status(500).json({ error: 'Could not save order. Please try again.' });
      }
    }

    // No database configured at all - local demo mode
    const memOrder = { ...newOrder, createdAt: new Date().toISOString(), _storage: 'memory' };
    memoryOrders.unshift(memOrder);
    console.warn(`[Order] No MONGODB_URI configured - stored in memory: ${newOrder.orderId}`);
    return res.status(201).json(memOrder);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('[Order] Unexpected error:', err);
    res.status(500).json({ error: 'Could not place order' });
  }
});

export default router;
