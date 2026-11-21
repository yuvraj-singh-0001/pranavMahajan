import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pranavmahajan';

  mongoose.connection.on('connected', () => {
    console.log(`[Database] Connected to ${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (error) => {
    console.error('[Database] Connection error:', error.message);
  });

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
  } catch (error) {
    console.warn(`[Database] MongoDB not reachable at ${uri} (${error.message}). Running in fallback mode.`);
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
  } catch (_) {}
}
