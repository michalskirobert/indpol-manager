import Message from "@/models/Message";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();

  const msg = await Message.create({
    senderId: data.senderId,
    recipientId: data.recipientId,
    content: data.content,
    meta: data.meta || {},
  });

  return NextResponse.json(msg);
};
