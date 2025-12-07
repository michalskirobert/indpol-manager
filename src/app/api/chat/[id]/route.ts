import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBOModels } from "@/models/dbModels";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  const { Message } = await getBOModels();

  const session = await getSession();

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const roomId = params.id;
  const participants = roomId.split("_");

  if (participants.length !== 2)
    return NextResponse.json(
      { message: "Invalid roomId format" },
      { status: 400 },
    );

  const [userA, userB] = participants;

  if (session.user.id !== userA && session.user.id !== userB)
    return NextResponse.json({ message: "Access denied" }, { status: 403 });

  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

  await Message.updateMany(
    {
      roomId,
      senderId: session.user.id === userA ? userB : userA,
      read: { $ne: true },
    },
    { $set: { read: true } },
  );

  return NextResponse.json(messages);
};
