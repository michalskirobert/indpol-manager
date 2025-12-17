import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import { ObjectId } from "mongodb";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  const session = await getSession();

  const db = await getCollection("BackOffice", "notifications");

  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "No userId provided" },
      { status: 400 },
    );
  }

  await db.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $addToSet: { readBy: userId } },
    { returnDocument: "after" },
  );

  return NextResponse.json({ success: true });
};
