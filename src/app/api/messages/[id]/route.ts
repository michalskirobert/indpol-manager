import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";

const getRoomId = (a: string, b: string) => [a, b].sort().join("_");

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await getSession();

  const messagesDb = await getCollection("BackOffice", "messages");
  const chatroomsDb = await getCollection("BackOffice", "chatrooms");

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

  const paginatedMessages = await messagesDb
    .find(messageFilter)
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(take)
    .toArray();

  const newMessages = await messagesDb
    .find({ read: false })
    .sort({ createdAt: 1 })
    .toArray();

  await messagesDb.updateMany(
    {
      senderId: peerId,
      recipientId: session.user.id,
      read: { $ne: true },
    },
    { $set: { read: true } },
  );

  await chatroomsDb.findOneAndUpdate(
    { roomId },
    { $set: { "lastMessage.read": true } },
    { returnDocument: "after" },
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
