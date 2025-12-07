import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getChatrooms } from "./get-chatrooms";
import { getBOModels } from "@/models/dbModels";

export const GET = async () => {
  const session = await getSession();

  if (!session?.user.id)
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const processedChatrooms = await getChatrooms(session);

  return NextResponse.json(processedChatrooms, { status: 200 });
};

export const POST = async (req: Request) => {
  const { Chatroom } = await getBOModels();

  const session = await getSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });
  }

  const body = await req.json();

  const recipientId = body.recipientId;

  const roomId = [session.user.id.toString(), recipientId].sort().join("_");

  let chatroom = await Chatroom.findOne({ roomId });

  if (!chatroom) {
    chatroom = await Chatroom.create({
      roomId,
      participants: [session.user.id, recipientId],
      lastMessage: {
        content: "",
        senderId: session.user.id.toString(),
        read: true,
        createdAt: new Date(),
      },
    });
  }

  return new Response(JSON.stringify(chatroom), { status: 200 });
};
