import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async () => {
  const session = await getSession();

  const db = await getCollection("BackOffice", "users");

  if (!session?.user.id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const users = await db
    .find({ _id: { $ne: new ObjectId(session.user.id) } })
    .toArray();

  return NextResponse.json({ items: users, totalCount: 2 }, { status: 200 });
};
