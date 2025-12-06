import Notification from "@/models/back-office/Notification";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "No userId provided" },
      { status: 400 },
    );
  }

  await Notification.findByIdAndUpdate(
    id,
    { $addToSet: { readBy: userId } },
    { new: true },
  ).lean();

  return NextResponse.json({ success: true });
};
