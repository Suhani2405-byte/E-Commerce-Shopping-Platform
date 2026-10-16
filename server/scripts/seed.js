import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { products } from '../data/productsData.js';

dotenv.config();

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>')) {
    console.error('\n❌ [Seed Failed] MONGODB_URI has "<db_username>".');
    console.log('👉 Please replace <db_username> in server/.env with your MongoDB Atlas database username.');
    console.log('💡 In Atlas: Go to "Database Access" in the left sidebar to see your username (or click "Add New Database User").\n');
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
