import express from 'express';
import Order from '../models/Order.js';
import { connectDB, getDbStatus } from '../config/db.js';

const router = express.Router();

// In-memory orders store fallback
const memoryOrders = [
  {
    orderId: "ORD-94821",
    items: [
      {
        productId: "prod-1",
        name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
        price: 348.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        selectedColor: "Midnight Black",
        selectedSize: "One Size"
      }
    ],
    customer: {
      fullName: "Alex Mercer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      zipCode: "97477",
      country: "United States"
    },
    payment: {
      method: "card",
      status: "Completed",
      transactionId: "TXN-73928104"
    },
    pricing: {
      subtotal: 348.00,
      shipping: 0,
      tax: 27.84,
      discountAmount: 20.00,
      couponApplied: "SAVE20",
      total: 355.84
    },
    status: "Delivered",
    estimatedDelivery: "Delivered on Apr 04, 2026",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
  }
];

// GET /api/orders - Get order history
router.get('/', async (req, res) => {
  try {
    await connectDB();
    const { connected } = getDbStatus();
    if (connected) {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return res.json(orders);
    }
    res.json(memoryOrders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.json(memoryOrders);
  }
});

// GET /api/orders/:id - Get single order
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
    const { items, customer, payment, pricing } = req.body;

    if (!items || !items.length || !customer || !pricing) {
      return res.status(400).json({ error: 'Missing required order fields: items, customer, pricing' });
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder = {
      orderId,
      items,
      customer,
      payment: {
        method: payment?.method || 'card',
        status: 'Completed',
        transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`
      },
      pricing: {
        subtotal: Number(pricing.subtotal || 0),
        shipping: Number(pricing.shipping || 0),
        tax: Number(pricing.tax || 0),
        discountAmount: Number(pricing.discountAmount || 0),
        couponApplied: pricing.couponApplied || '',
        total: Number(pricing.total || 0)
      },
      status: 'Processing',
      estimatedDelivery: `Estimated Delivery by ${deliveryDate}`,
      createdAt: new Date().toISOString()
    };

    // Always attempt to connect before saving
    await connectDB();
    const dbStatus = getDbStatus();
    console.log(`[Order] DB connected: ${dbStatus.connected}, orderId: ${orderId}`);

    if (dbStatus.connected) {
      try {
        const orderDoc = new Order(newOrder);
        await orderDoc.save();
        console.log(`[Order] Successfully saved to MongoDB Atlas: ${orderId}`);
        return res.status(201).json(orderDoc);
      } catch (dbErr) {
        console.error(`[Order] MongoDB save failed: ${dbErr.message}`);
        memoryOrders.unshift(newOrder);
        return res.status(201).json({
          ...newOrder,
          _storage: 'memory_fallback',
          _dbError: dbErr.message
        });
      }
    } else {
      console.warn(`[Order] MongoDB not connected (${dbStatus.lastError || 'No URI'}) - storing in memory: ${orderId}`);
      memoryOrders.unshift(newOrder);
      return res.status(201).json({
        ...newOrder,
        _storage: 'memory_fallback',
        _dbError: dbStatus.lastError || 'Database connection unavailable'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
