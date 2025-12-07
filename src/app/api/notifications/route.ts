import { getBOModels } from "@/models/dbModels";

import { NextResponse } from "next/server";

export const GET = async () => {
  const { Notification } = await getBOModels();

  const items = await Notification.find().sort({ createdAt: -1 }).limit(10);

  return NextResponse.json(items, { status: 200 });
};
