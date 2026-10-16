import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n⚠️ [Database Notice] No MONGODB_URI found in environment variables.');
    console.warn('💡 The server will run in "Smart Memory Mode" using the built-in 50 products.');
    console.warn('👉 To connect MongoDB Atlas, create a free database at mongodb.com/cloud/atlas and add MONGODB_URI to server/.env!\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`\n✅ [MongoDB Atlas Connected] Host: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error(`\n❌ [MongoDB Connection Error]: ${err.message}`);
    console.warn('💡 Operating seamlessly with in-memory store so your application remains fully functional!\n');
    isConnected = false;
    return false;
  }
};

export const getDbStatus = () => ({
  connected: isConnected && mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: isConnected ? mongoose.connection.host : 'Memory Store (Built-in 50 Items)'
});
