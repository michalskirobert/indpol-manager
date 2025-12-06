import { NextResponse } from "next/server";
import Notification from "../../../../models/back-office/Notification";

export const PATCH = async (req: Request) => {
  const userId = req.headers.get("x-user-id");

  await Notification.updateMany({ userId }, { read: true });

  return NextResponse.json({ success: true });
};
