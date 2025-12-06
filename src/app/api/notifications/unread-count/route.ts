import { NextResponse } from "next/server";
import Notification from "../../../../models/back-office/Notification";
import { getSession } from "@/lib/auth";

export const GET = async () => {
  try {
    const session = await getSession();

    const userId = session?.user.id;

    const count = await Notification.countDocuments({
      readBy: { $ne: userId },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
};
