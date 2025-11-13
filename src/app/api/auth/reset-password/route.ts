import { connectDB } from "@lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "@/app/api/models/User.model";

export async function POST(request: Request) {
  try {
    await connectDB("BackOffice");

    const { email, password, confirmPassword } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required!" },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password is required!" },
        { status: 400 },
      );
    }

    if (!confirmPassword) {
      return NextResponse.json(
        { message: "Confirm Password is required!" },
        { status: 400 },
      );
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const isPasswordSame = await bcrypt.compare(password, foundUser.password);

    if (isPasswordSame) {
      return NextResponse.json(
        { message: "New password cannot be the same as the old one" },
        { status: 409 },
      );
    }

    await User.updateOne(
      { _id: foundUser._id },
      { $set: { password: hashedPassword } },
    );

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during recovering password, details: ", error);
      return NextResponse.json(
        { message: "Server is not responding, contact with the Administrator" },
        { status: 500 },
      );
    }
  }
}
