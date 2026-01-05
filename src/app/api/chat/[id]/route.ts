import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import { MessageParams } from "@/types/message";
import { Params } from "@/types/global";

export const GET = async (_: Request, { params }: Params) => {
  const db = await getCollection("BackOffice", "messages");

  const session = await getSession();

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const { id } = await params;

  const roomId = id;

  const participants = roomId.split("_");

  if (participants.length !== 2)
    return NextResponse.json(
      { message: "Invalid roomId format" },
      { status: 400 },
    );

  const [userA, userB] = participants;

  if (session.user.id !== userA && session.user.id !== userB)
    return NextResponse.json({ message: "Access denied" }, { status: 403 });

  const messages = db.find<MessageParams[]>({ roomId }).sort({ createdAt: 1 });

  await db.updateMany(
    {
      roomId,
      senderId: session.user.id === userA ? userB : userA,
      read: { $ne: true },
    },
    { $set: { read: true } },
  );

  return NextResponse.json(messages);
};
