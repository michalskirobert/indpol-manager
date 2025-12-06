import { NextResponse } from "next/server";
import Message from "@/models/back-office/Message";
import { getSession } from "@/lib/auth";
import Chatroom from "@/models/back-office/Chatroom";

const getRoomId = (a: string, b: string) => [a, b].sort().join("_");

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const { id: peerId } = await params;
  const roomId = getRoomId(peerId, session.user.id);

  const { searchParams } = new URL(req.url);
  const skip = Number(searchParams.get("skip")) || 0;
  const take = Number(searchParams.get("take")) || 20;

  const messageFilter = {
    $or: [
      { senderId: peerId, recipientId: session.user.id },
      { senderId: session.user.id, recipientId: peerId },
    ],
  };

  const paginatedMessages = await Message.find(messageFilter)
    .sort({ createdAt: 1 })
    .limit(take)
    .skip(skip);

  const newMessages = await Message.find({ read: false }).sort({
    createdAt: 1,
  });

  await Message.updateMany(
    {
      senderId: peerId,
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

  const merged = [...paginatedMessages, ...newMessages];

  const unique = Array.from(
    new Map(merged.map((m: any) => [m._id.toString(), m])).values(),
  );

  unique.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return NextResponse.json(unique, { status: 200 });
};
