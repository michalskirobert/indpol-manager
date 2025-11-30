import { getSession } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/types/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB("BackOffice");

  const session = await getSession();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const users = await User.find({ _id: { $ne: session.user.id } }).lean();

  return NextResponse.json({ items: users, totalCount: 2 }, { status: 200 });
};
