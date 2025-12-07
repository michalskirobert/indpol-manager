import { getSession } from "@/lib/auth";
import { getBOModels } from "@/models/dbModels";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  const session = await getSession();

  const { Notification } = await getBOModels();

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
