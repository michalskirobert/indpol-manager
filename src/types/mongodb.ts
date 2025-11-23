import { DataBaseValue } from "@/types/database";
import mongoose from "mongoose";

const { MONGODB_URI_FO, MONGODB_URI_BO } = process.env;

if (!MONGODB_URI_FO || !MONGODB_URI_BO) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async (dbName?: DataBaseValue) => {
  try {
    const { connection } = await mongoose.connect(
      dbName === "BackOffice" ? MONGODB_URI_BO : MONGODB_URI_FO,
    );

    const db = mongoose.connection.useDb(dbName || "store");

    if (connection.readyState === 1) {
      return Promise.resolve(db);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
