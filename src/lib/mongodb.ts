import { DataBaseValue } from "@/types/database";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async (dbName?: DataBaseValue) => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection.useDb(dbName || "store");

    if (connection.readyState === 1) {
      return Promise.resolve(db);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
