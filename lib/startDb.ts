// export async function startDb() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL as string);
//     console.log("db successful");
//   } catch (error) {
//     console.log("dbs: " + error);
//   }
// }
import mongoose, { Schema, Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL!;

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

export async function startDb(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("cached hit");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("db hit afresh");
  return cached.conn;
}
