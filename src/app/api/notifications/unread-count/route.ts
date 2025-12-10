import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBOModels } from "@/models/dbModels";

export const GET = async () => {
  try {
    const { Notification } = await getBOModels();

    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const userId = session?.user.id;

    const count = await Notification.countDocuments({
      readBy: { $ne: userId },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
};
