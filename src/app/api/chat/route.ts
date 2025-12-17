import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getChatrooms } from "./get-chatrooms";
import { getCollection } from "@/lib/mongodb";
import { ChatroomParams } from "@/types/message";

export const GET = async () => {
  const session = await getSession();

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const processedChatrooms = await getChatrooms(session);

  return NextResponse.json(processedChatrooms, { status: 200 });
};

export const POST = async (req: Request) => {
  const db = await getCollection<ChatroomParams>("BackOffice", "chatrooms");

  const session = await getSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });
  }

  const body = await req.json();

  const recipientId = body.recipientId;

  const roomId = [session.user.id.toString(), recipientId].sort().join("_");

  let chatroom = await db.findOne({ roomId });

  if (!chatroom) {
    const insertResult = await db.insertOne({
      roomId,
      participants: [session.user.id, recipientId],
      lastMessage: {
        content: "",
        senderId: session.user.id.toString(),
        read: true,
        createdAt: new Date(),
      },
    });

    chatroom = await db.findOne({ _id: insertResult.insertedId });
  }

  return new Response(JSON.stringify(chatroom), { status: 200 });
};
