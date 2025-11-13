import { NextResponse } from "next/server";
import { getSession } from "@lib/auth";
import { connectDB } from "@lib/mongodb";
import User from "@models/User.model";
import { UserProps } from "@/types/user";

export const POST = async () => {
  try {
    await connectDB();
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "No session found" },
        { status: 401 },
      );
    }

    const foundUser = await User.findOne<UserProps>({ _id: session.user._id });

    if (!foundUser) {
      const response = NextResponse.json(
        { message: "User not found" },
        { status: 403 },
      );

      response.headers.set(
        "Set-Cookie",
        `next-auth.session-token=; Path=/; HttpOnly; Max-Age=0;`,
      );
      return response;
    }

    return NextResponse.json("OK");
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
