import { DataBaseValue } from "@/types/database";
import mongoose from "mongoose";

const { MONGODB_URI_FO, MONGODB_URI_BO } = process.env;

if (!MONGODB_URI_FO || !MONGODB_URI_BO) {
  throw new Error("MONGODB_URI_FO and MONGODB_URI_BO must be defined");
}

const connections: Record<string, mongoose.Connection> = {};

export const connectDB = async (dbName: DataBaseValue) => {
  let uri: string;

  if (dbName === "BackOffice") {
    uri = MONGODB_URI_BO;
  } else if (dbName === "store") {
    uri = MONGODB_URI_FO;
  } else {
    throw new Error(`Invalid dbName provided to connectDB(): ${dbName}`);
  }

  if (connections[uri]) {
    return connections[uri];
  }

  try {
    const conn = await mongoose
      .createConnection(uri, {
        serverSelectionTimeoutMS: 5000,
        tls: true,
      })
      .asPromise();

    connections[uri] = conn;
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
