import { NextResponse } from "next/server";
import Message from "../../../../models/Message";
import { getSession } from "@/lib/auth";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  const session = await getSession();

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const messages = await Message.find({
    $or: [
      { senderId: params.id, recipientId: session.user.id },
      { senderId: session.user.id, recipientId: params.id },
    ],
  }).sort({ createdAt: 1 });

  await Message.updateMany(
    {
      senderId: params.id,
      recipientId: session.user.id,
      read: { $ne: true },
    },
    { $set: { read: true } },
  );

  return NextResponse.json(messages);
};
