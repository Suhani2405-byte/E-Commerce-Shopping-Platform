import express from 'express';
import Product from '../models/Product.js';
import { products as memoryProducts } from '../data/productsData.js';
import { getDbStatus } from '../config/db.js';

const router = express.Router();

// Helper to filter in memory when MongoDB is not connected
const filterMemoryProducts = (query) => {
  let list = [...memoryProducts];
  const {
    q,
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    inStock,
    sort,
    page = 1,
    limit = 12
  } = query;

  if (q) {
    const term = q.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  }

  if (category && category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand && brand !== 'All') {
    const brands = Array.isArray(brand) ? brand : [brand];
    list = list.filter(p => brands.map(b => b.toLowerCase()).includes(p.brand.toLowerCase()));
  }

  if (minPrice) {
    list = list.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter(p => p.price <= Number(maxPrice));
  }

  if (minRating) {
    list = list.filter(p => p.rating >= Number(minRating));
  }

  if (inStock === 'true' || inStock === true) {
    list = list.filter(p => p.stock > 0);
  }

  // Sorting
  switch (sort) {
    case 'price_asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating_desc':
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      list.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      // Default: relevance / popularity
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  const pageNum = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const total = list.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const paginated = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return {
    products: paginated,
    total,
    page: pageNum,
    totalPages,
    limit: pageSize
  };
};

// GET /api/products - Filtered, sorted, paginated
router.get('/', async (req, res) => {
  try {
    const { connected } = getDbStatus();

    if (!connected) {
      const result = filterMemoryProducts(req.query);
      return res.json(result);
    }

    const {
      q,
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const mongoQuery = {};

    if (q) {
      mongoQuery.$or = [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    if (category && category !== 'All') {
      mongoQuery.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (brand && brand !== 'All') {
      const brands = Array.isArray(brand) ? brand : [brand];
      mongoQuery.brand = { $in: brands.map(b => new RegExp(`^${b}$`, 'i')) };
    }

    if (minPrice || maxPrice) {
      mongoQuery.price = {};
      if (minPrice) mongoQuery.price.$gte = Number(minPrice);
      if (maxPrice) mongoQuery.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      mongoQuery.rating = { $gte: Number(minRating) };
    }

    if (inStock === 'true' || inStock === true) {
      mongoQuery.stock = { $gt: 0 };
    }

    let sortOption = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating_desc' || sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'popular') sortOption = { reviewCount: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };

    const pageNum = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNum - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(mongoQuery).sort(sortOption).skip(skip).limit(pageSize).lean(),
      Product.countDocuments(mongoQuery)
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / pageSize) || 1,
      limit: pageSize
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    // Fallback on memory
    res.json(filterMemoryProducts(req.query));
  }
});

// GET /api/products/categories - Distinct categories with counts
router.get('/categories', async (req, res) => {
  try {
    const { connected } = getDbStatus();
    let categories = [];

    if (connected) {
      const counts = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]);
      categories = counts.map(c => ({ name: c._id, count: c.count }));
    } else {
      const map = {};
      memoryProducts.forEach(p => {
        map[p.category] = (map[p.category] || 0) + 1;
      });
      categories = Object.entries(map).map(([name, count]) => ({ name, count }));
    }

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/brands - Distinct brands
router.get('/brands', async (req, res) => {
  try {
    const { connected } = getDbStatus();
    let brands = [];

    if (connected) {
      brands = await Product.distinct('brand');
    } else {
      brands = [...new Set(memoryProducts.map(p => p.brand))].sort();
    }

    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/featured - Featured products
router.get('/featured', async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const items = await Product.find({ isFeatured: true }).limit(8).lean();
      return res.json(items);
    }
    const items = memoryProducts.filter(p => p.isFeatured).slice(0, 8);
    res.json(items);
  } catch (err) {
    res.json(memoryProducts.filter(p => p.isFeatured).slice(0, 8));
  }
});

// GET /api/products/trending - Trending products
router.get('/trending', async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const items = await Product.find({ isTrending: true }).limit(8).lean();
      return res.json(items);
    }
    const items = memoryProducts.filter(p => p.isTrending).slice(0, 8);
    res.json(items);
  } catch (err) {
    res.json(memoryProducts.filter(p => p.isTrending).slice(0, 8));
  }
});

// GET /api/products/:id - Single product details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();

    if (connected) {
      const product = await Product.findOne({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] }).lean();
      if (product) return res.json(product);
    }

    const memoryItem = memoryProducts.find(p => p.id === id || p._id === id);
    if (!memoryItem) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(memoryItem);
  } catch (err) {
    const memoryItem = memoryProducts.find(p => p.id === req.params.id);
    if (memoryItem) return res.json(memoryItem);
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST /api/products/:id/reviews - Add customer review
router.post('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
      return res.status(400).json({ error: 'User name, rating, and comment are required' });
    }

    const newReview = {
      id: `r-${Date.now()}`,
      user,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      comment
    };

    const { connected } = getDbStatus();
    if (connected) {
      const product = await Product.findOne({ id });
      if (product) {
        product.reviews.unshift(newReview);
        product.reviewCount = product.reviews.length;
        const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
        product.rating = Number((totalRating / product.reviews.length).toFixed(1));
        await product.save();
        return res.status(201).json(product);
      }
    }

    // In-memory update
    const product = memoryProducts.find(p => p.id === id);
    if (product) {
      product.reviews = product.reviews || [];
      product.reviews.unshift(newReview);
      product.reviewCount = product.reviews.length;
      const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.rating = Number((totalRating / product.reviews.length).toFixed(1));
      return res.status(201).json(product);
    }

    res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
