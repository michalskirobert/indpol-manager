import mongoose, { Connection } from "mongoose";

const { MONGODB_URI_FO, MONGODB_URI_BO } = process.env;
if (!MONGODB_URI_FO || !MONGODB_URI_BO)
  throw new Error("Mongo URIs must be defined");

const connections: Record<string, Connection> = {};

export const connectDB = async (
  dbName: "store" | "BackOffice",
): Promise<Connection> => {
  const uri = dbName === "store" ? MONGODB_URI_FO : MONGODB_URI_BO;

  if (connections[uri]) return connections[uri];

  try {
    const conn = await mongoose
      .createConnection(uri, {
        tls: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 50,
      })
      .asPromise();

    connections[uri] = conn;
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
