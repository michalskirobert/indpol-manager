import { getSession } from "@/lib/auth";
import { connectDB } from "@/types/mongodb";
import { updateLastSeen } from "./helpers";
import { NextResponse } from "next/server";

export const PATCH = async () => {
  const session = await getSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });
  }

  const res = await updateLastSeen(session);

  return NextResponse.json(res, { status: 200 });
};
