import User from "@/app/api/models/User.model";
import { connectDB } from "@/types/mongodb";

import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

await connectDB("BackOffice");

export const GET = async (_: NextRequest, { params: { id } }: RouteParams) => {
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

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: RouteParams,
) => {
  try {
    const body = await req.json();

    const foundUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );

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
