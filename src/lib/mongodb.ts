import mongoose, { Connection, Document } from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("Mongo URIs must be defined");

let cachedConnection: Connection | null = null;

export const connectDB = async (): Promise<Connection> => {
  if (cachedConnection) {
    return cachedConnection;
  }

  cachedConnection = await mongoose
    .createConnection(MONGODB_URI, {
      tls: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
    })
    .asPromise();

  return cachedConnection;
};

export const getCollection = async <T extends object>(
  database: "store" | "BackOffice" = "store",
  collectionName: string,
): Promise<mongoose.Collection<T>> => {
  const connection = (await connectDB()).useDb(database);

  return connection.collection(collectionName);
};
