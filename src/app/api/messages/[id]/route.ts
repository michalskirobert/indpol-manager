import { NextResponse } from "next/server";
import Message from "../../../../models/Message";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  const me = req.headers.get("x-user-id");
  const other = params.userId;

  const messages = await Message.find({
    $or: [
      { senderId: me, recipientId: other },
      { senderId: other, recipientId: me },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(messages);
};
