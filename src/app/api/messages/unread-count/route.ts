import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBOModels } from "@/models/dbModels";

export const GET = async (req: Request) => {
  try {
    const session = await getSession();

    const { Message } = await getBOModels();

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
  } catch (error) {
    console.log(error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
};
