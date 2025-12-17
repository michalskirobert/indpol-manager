import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";

export const GET = async (req: Request) => {
  try {
    const session = await getSession();

    const db = await getCollection("BackOffice", "messages");

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const count = await db.countDocuments({
      recipientId: session.user.id,
      read: false,
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
};
