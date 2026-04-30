import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string;

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
