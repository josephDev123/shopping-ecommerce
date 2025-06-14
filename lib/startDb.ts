import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URL environment variable.");
}

// Extend the global object
declare global {
  var mongooseCache:
    | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
    | undefined;
}

let cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;
const MaxRetry = 3;
const retryDelay = 1000;

export async function startDb(retryCount = 0): Promise<Mongoose> {
  try {
    if (cached.conn) {
      console.log("✅ Using cached DB connection");
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI as string, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    console.log("✅ New DB connection established");
    return cached.conn;
  } catch (error) {
    // Clear the failed promise so the next retry doesn't reuse a broken one
    cached.promise = null;
    if (retryCount < MaxRetry) {
      retryCount++;
      console.warn(`🔁 Retrying DB connection... attempt ${retryCount + 1}`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return startDb(retryCount);
    }
    console.error("❌ Database connection failed after retries:", error);
    throw new Error("Failed to connect to the database after retries.");
  }
}
