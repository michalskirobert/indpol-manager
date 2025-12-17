import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await getCollection("BackOffice", "notifications");

  const items = await db.find().sort({ createdAt: -1 }).limit(10);

  return NextResponse.json(items, { status: 200 });
};
