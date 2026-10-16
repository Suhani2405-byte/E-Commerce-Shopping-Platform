import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>')) {
    console.warn('\n⚠️ [Database Notice] MONGODB_URI requires your MongoDB Atlas database username.');
    console.warn('👉 In MongoDB Atlas: Left Menu -> Database Access -> Check your "Username" (or click "Add New Database User").');
    console.warn('💡 The server is running smoothly in Smart Memory Mode with all 50 products active!\n');
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
