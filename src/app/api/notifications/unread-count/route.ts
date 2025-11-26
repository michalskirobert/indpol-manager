import { NextResponse } from "next/server";
import Notification from "../../models/Notification";
import { getSession } from "@/lib/auth";

export const GET = async () => {
  const session = await getSession();

  const userId = session?.user.id;

  const count = await Notification.countDocuments({
    userId,
    readBy: { $ne: userId },
  });

  return NextResponse.json({ count });
};
