import { getSession } from "@/lib/auth";
import Chatroom from "@/models/Chatroom";
import { connectDB } from "@/types/mongodb";

export const POST = async (req: Request) => {
  await connectDB("BackOffice");

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
