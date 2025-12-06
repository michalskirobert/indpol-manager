import { NextResponse } from "next/server";
import Message from "../../../../models/back-office/Message";
import { connectDB } from "@/types/mongodb";
import { getSession } from "@/lib/auth";

export const GET = async (req: Request) => {
  await connectDB("BackOffice");

  const session = await getSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });
  }

  const count = await Message.countDocuments({
    recipientId: session.user.id,
    read: false,
  });

  return NextResponse.json({ count });
};
