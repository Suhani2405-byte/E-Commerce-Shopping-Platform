import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { products } from '../data/productsData.js';

dotenv.config();

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('\n❌ [Seed Failed] MONGODB_URI is not defined in server/.env');
    console.log('👉 Please set MONGODB_URI in server/.env (e.g., mongodb+srv://<user>:<password>@cluster0.mongodb.net/ecommerce)\n');
    process.exit(1);
  }

  try {
    console.log('\n⏳ Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully.');

    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});

    console.log(`🌱 Seeding ${products.length} comprehensive products...`);
    await Product.insertMany(products);

    console.log(`\n🎉 Success! Successfully seeded ${products.length} products into your MongoDB database!`);
    console.log('Categories seeded: Electronics, Fashion, Home & Living, Beauty, Sports & Fitness, Books\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedDatabase();
