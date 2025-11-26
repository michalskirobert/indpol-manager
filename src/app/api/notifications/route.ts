import Notification from "@/app/api/models/Notification";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getSession();

  const userId = session?.user.id;

  const items = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);

  return NextResponse.json(items);
};
