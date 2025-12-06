import { getSession } from "@/lib/auth";
import Message from "@/models/Message";
import Chatroom from "@/models/Chatroom";
import { MessageParams } from "@/types/message";
import { connectDB } from "@/types/mongodb";
import { NextResponse } from "next/server";
import { updateLastSeen } from "../../auth/users/lastSeen/helpers";
import { getRoomId } from "../utils";

export const POST = async (req: Request) => {
  try {
    await connectDB("BackOffice");

    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const data = (await req.json()) as MessageParams;

    const { content, recipientId } = data;

    const roomId = getRoomId(recipientId, session.user.id);

    const msg = await Message.create<MessageParams>({
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
    return NextResponse.json({ message: "" }, { status: 500 });
  }
};
