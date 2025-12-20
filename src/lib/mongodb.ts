import clientPromise from "./mongo-client";
import type { Db, Collection, Document } from "mongodb";

const dbCache = new Map<string, Db>();

export async function getDb(name: "store" | "BackOffice"): Promise<Db> {
  if (dbCache.has(name)) {
    return dbCache.get(name)!;
  }

  const client = await clientPromise;
  const db = client.db(name);

  dbCache.set(name, db);
  return db;
}

export async function getCollection<T extends Document>(
  dbName: "store" | "BackOffice",
  collectionName: string,
): Promise<Collection<T>> {
  const db = await getDb(dbName);
  return db.collection<T>(collectionName);
}
