import { User } from "@/models/store";
import { DataBaseValue } from "@/types/database";
import mongoose from "mongoose";

const { MONGODB_URI_FO, MONGODB_URI_BO } = process.env;

if (!MONGODB_URI_FO || !MONGODB_URI_BO) {
  throw new Error("MONGODB_URI must be defined");
}
const connections: Record<string, mongoose.Connection> = {};

export const connectDB = async (dbName?: DataBaseValue) => {
  const uri = dbName === "BackOffice" ? MONGODB_URI_BO : MONGODB_URI_FO;
  if (connections[uri]) {
    return connections[uri];
  }

  try {
    const conn = await mongoose.createConnection(uri).asPromise();
    connections[uri] = conn;
    return conn;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
