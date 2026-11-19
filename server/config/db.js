import mongoose from 'mongoose';

// Cache connection promise so it's reused across requests (critical for Vercel)
let connectionPromise = null;
let lastError = null;

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>')) {
    lastError = uri
      ? 'MONGODB_URI still contains <db_username> placeholder'
      : 'MONGODB_URI environment variable is missing or undefined';
    console.warn(`\n[Database Notice] ${lastError} - running in Memory Mode.`);
    return false;
  }

  // Clean surrounding whitespace and quotes
  uri = uri.trim().replace(/^["']|["']$/g, '');

  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    lastError = null;
    return true;
  }

  // Reuse in-flight connection promise (prevents multiple simultaneous connects)
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    }).then(conn => {
      lastError = null;
      console.log(`\n[MongoDB Atlas Connected] Host: ${conn.connection.host}`);
      return true;
    }).catch(err => {
      lastError = err.message;
      console.error(`\n[MongoDB Connection Error]: ${err.message}`);
      connectionPromise = null; // Reset so next request retries
      return false;
    });
  }

  return await connectionPromise;
};

export const getDbStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  hasUri: !!process.env.MONGODB_URI,
  uriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.slice(0, 16) + '...' : 'none',
  lastError: lastError,
  host: mongoose.connection.readyState === 1 ? mongoose.connection.host : 'Memory Store (Built-in 50 Items)'
});
