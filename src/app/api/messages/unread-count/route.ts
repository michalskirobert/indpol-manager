import { NextResponse } from "next/server";
import Message from "../../models/Message";

export const GET = async (req: Request) => {
  const userId = req.headers.get("x-user-id");

  const count = await Message.countDocuments({
    recipientId: userId,
    read: false,
  });

  return NextResponse.json({ count });
};
