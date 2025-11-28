import User from "@/models/User";
import { connectDB } from "@/types/mongodb";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export const GET = async (_req: NextRequest, context: RouteParams) => {
  await connectDB("BackOffice");
  const { id } = context.params;

  try {
    const foundUser = await User.findOne({ _id: id });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json(foundUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server not respond" },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest, context: RouteParams) => {
  await connectDB("BackOffice");
  const { id } = context.params;

  try {
    const body = await req.json();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    if (body?.oldPassword) {
      const isPasswordSame = await bcrypt.compare(
        body.oldPassword,
        user.password,
      );

      if (!isPasswordSame) {
        return NextResponse.json(
          { message: "Old password is incorrect." },
          { status: 400 },
        );
      }
    }

    if (body.newPassword) {
      const isEqualToOldPassword = await bcrypt.compare(
        body.newPassword,
        body.oldPassword,
      );

      if (isEqualToOldPassword) {
        return NextResponse.json(
          { message: "New password and old one cannot be same!" },
          { status: 400 },
        );
      }

      body.password = await bcrypt.hash(body.newPassword, 12);
    }

    Object.assign(user, body);
    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { message: "Server not respond", error: (error as Error).message },
      { status: 500 },
    );
  }
};
