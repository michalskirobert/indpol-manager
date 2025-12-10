import { getSession } from "@/lib/auth";
import { MessageParams } from "@/types/message";
import { NextResponse } from "next/server";
import { updateLastSeen } from "../../auth/users/lastSeen/helpers";
import { getRoomId } from "../utils";
import { getBOModels } from "@/models/dbModels";

export const POST = async (req: Request) => {
  try {
    const { Message, Chatroom } = await getBOModels();

    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const data = (await req.json()) as MessageParams;

    const { content, recipientId } = data;

    const roomId = getRoomId(recipientId, session.user.id);

    const msg = await Message.create({
      roomId,
      content,
      read: false,
      recipientId,
      senderId: session?.user.id,
    });

    if (!msg) {
      return NextResponse.json(
        { message: "Message cannot be sent" },
        { status: 408 },
      );
    }

    await Chatroom.findOneAndUpdate(
      { roomId },
      {
        lastMessage: {
          content: msg.content,
          senderId: msg.senderId,
          createdAt: msg.createdAt,
          read: msg.read,
        },
      },
      { new: true },
    );

    await updateLastSeen(session);

    return NextResponse.json(msg, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
