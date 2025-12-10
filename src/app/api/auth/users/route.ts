import { getSession } from "@/lib/auth";
import { getBOModels } from "@/models/dbModels";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getSession();

  const { User } = await getBOModels();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const users = await User.find({ _id: { $ne: session.user.id } }).lean();

  return NextResponse.json({ items: users, totalCount: 2 }, { status: 200 });
};
