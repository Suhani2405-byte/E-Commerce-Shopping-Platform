import mongoose from 'mongoose';

// Cache connection promise so it's reused across requests (critical for Vercel)
let connectionPromise = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>')) {
    console.warn('\n⚠️ [Database Notice] MONGODB_URI not configured — running in Memory Mode.');
    return false;
  }

  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  // Reuse in-flight connection promise (prevents multiple simultaneous connects)
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    }).then(conn => {
      console.log(`\n✅ [MongoDB Atlas Connected] Host: ${conn.connection.host}`);
      return true;
    }).catch(err => {
      console.error(`\n❌ [MongoDB Connection Error]: ${err.message}`);
      connectionPromise = null; // Reset so next request retries
      return false;
    });
  }

  return await connectionPromise;
};

export const getDbStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.readyState === 1 ? mongoose.connection.host : 'Memory Store (Built-in 50 Items)'
});
