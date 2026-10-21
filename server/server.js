import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { products } from './data/productsData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize Database (Atlas or Smart Memory fallback)
connectDB();

// API Routes (supports both /api/* and root rewrites)
app.use('/api/products', productRoutes);
app.use('/products', productRoutes);

app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

app.use('/api/ai', aiRoutes);
app.use('/ai', aiRoutes);

// Health & Status endpoint
app.get(['/api/health', '/health'], (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.connected,
      mode: dbStatus.connected ? 'MongoDB Atlas' : 'Smart In-Memory Store (Active)',
      host: dbStatus.host
    },
    totalProductsAvailable: products.length,
    endpoints: [
      '/api/products',
      '/api/products/categories',
      '/api/products/brands',
      '/api/products/featured',
      '/api/products/trending',
      '/api/orders',
      '/api/ai/insights',
      '/api/ai/recommendations',
      '/api/ai/track'
    ]
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'E-Commerce Shopping Platform Backend API is running smoothly.',
    documentation: '/api/health'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start listening if running directly (not in Vercel serverless context)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 [Server Ready] Running on http://localhost:${PORT}`);
    console.log(`📡 [Health Check] Visit http://localhost:${PORT}/api/health\n`);
  });
}

export default app;
