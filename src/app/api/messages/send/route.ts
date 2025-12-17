import { getSession } from "@/lib/auth";
import { ChatroomParams, MessageParams } from "@/types/message";
import { NextResponse } from "next/server";
import { updateLastSeen } from "../../auth/users/lastSeen/helpers";
import { getRoomId } from "../utils";
import { getCollection } from "@/lib/mongodb";

export const POST = async (req: Request) => {
  try {
    const messagesDb = await getCollection<MessageParams>(
      "BackOffice",
      "messages",
    );
    const chatroomsDb = await getCollection<ChatroomParams>(
      "BackOffice",
      "chatrooms",
    );

    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const data = (await req.json()) as MessageParams;

    const { content, recipientId } = data;

    const roomId = getRoomId(recipientId, session.user.id);

    const now = new Date();

    const insertResult = await messagesDb.insertOne({
      roomId,
      content,
      read: false,
      recipientId,
      senderId: session?.user.id,
      createdAt: now,
      updatedAt: now,
    });

    if (!insertResult.insertedId) {
      return NextResponse.json(
        { message: "Message cannot be sent" },
        { status: 408 },
      );
    }

    const msg = await messagesDb.findOne({ _id: insertResult.insertedId });

    if (!msg) {
      return NextResponse.json(
        { message: "Message cannot be found after insertion" },
        { status: 408 },
      );
    }

    await chatroomsDb.findOneAndUpdate(
      { roomId },
      {
        $set: {
          lastMessage: {
            content: msg.content,
            senderId: msg.senderId,
            createdAt: msg.createdAt,
            read: msg.read,
          },
          updatedAt: now,
        },
      },
      { returnDocument: "after" },
    );

    await updateLastSeen(session);

    return NextResponse.json(msg, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
