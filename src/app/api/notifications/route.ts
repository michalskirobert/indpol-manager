import Notification from "@/models/back-office/Notification";

import { NextResponse } from "next/server";

export const GET = async () => {
  const items = await Notification.find().sort({ createdAt: -1 }).limit(10);

  return NextResponse.json(items, { status: 200 });
};
