import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";

export const GET = async () => {
  try {
    const db = await getCollection("BackOffice", "notifications");

    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const userId = session?.user.id;

    const count = await db.countDocuments({
      readBy: { $ne: userId },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
};
