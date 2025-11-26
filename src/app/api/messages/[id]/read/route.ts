import Message from "@/app/api/models/Message";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  await Message.findByIdAndUpdate(id, { read: true });

  return NextResponse.json({ success: true });
};
