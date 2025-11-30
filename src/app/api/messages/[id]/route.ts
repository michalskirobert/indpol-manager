import { NextResponse } from "next/server";
import Message from "../../../../models/Message";
import { getSession } from "@/lib/auth";
import Chatroom from "@/models/Chatroom";

export const GET = async (
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) => {
  const session = await getSession();

  const { id: senderId } = await ctx.params;

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const roomId = [senderId, session.user.id].sort().join("_");

  const messages = await Message.find({
    $or: [
      { senderId, recipientId: session.user.id },
      { senderId: session.user.id, recipientId: senderId },
    ],
  }).sort({ createdAt: 1 });

  await Message.updateMany(
    {
      senderId,
      recipientId: session.user.id,
      read: { $ne: true },
    },
    { $set: { read: true } },
  );

  await Chatroom.findOneAndUpdate(
    { roomId },
    { "lastMessage.read": true },
    { new: true },
  );

  return NextResponse.json(messages);
};
