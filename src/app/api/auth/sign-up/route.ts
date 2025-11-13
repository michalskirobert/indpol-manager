import { connectDB } from "@lib/mongodb";
import User from "@/app/api/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import axios from "axios";
import { generateUserToken } from "./utils";
import { UserProps } from "../../types/user.types";

export async function POST(request: Request) {
  try {
    await connectDB("users");

    const { fullname, email, desc, profileImgSrc, _id, bgImgSrc } =
      (await request.json()) as UserProps;

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    const user: UserProfileProps = {
      name,
      email,
      phone,
      password,
      address,
      blocked: false,
    };

    const userToken = generateUserToken(user);

    const activeUrl = `${process.env.NEXTAUTH_URL}/${locale}/register/${userToken}`;

    const createdSignUpEmailTemplate = createSignUpEmailTemplate(
      locale,
      activeUrl,
    );

    const emailBodyRequest: EmailRequestProps = {
      html: createdSignUpEmailTemplate,
      email,
      subject: translate(locale, "welcome", { email }),
    };

    await axios.post(`${process.env.NEXTAUTH_URL}/api/email`, emailBodyRequest);

    return NextResponse.json("OK", { status: 201 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during signup:", error);
      return NextResponse.json(
        { message: "Server is not responding, contact with the Administrator" },
        { status: 500 },
      );
    }
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const { _id, name, email, password, phone, address } =
      (await request.json()) as UserDocument;

    if (password && password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const userToUpdate = await User.findById(_id);

    if (!userToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (name) {
      userToUpdate.name = name;
    }

    if (email) {
      userToUpdate.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      userToUpdate.password = hashedPassword;
    }

    if (phone) {
      userToUpdate.phone = phone;
    }

    if (address) {
      userToUpdate.address = address;
    }

    (await userToUpdate.save()) as UserDocument;

    return NextResponse.json(
      {
        message: "User updated successfully",
        updatedUser: {
          id: userToUpdate._id,
          name: userToUpdate.name,
          email: userToUpdate.email,
          createdAt: userToUpdate.createdAt,
          updatedAt: userToUpdate.updatedAt,
          addres: userToUpdate.address,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during user update:", error);
      return NextResponse.json(
        { message: "Server is not responding, contact with the Administrator" },
        { status: 500 },
      );
    }
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await user.remove();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("User cannot be removed: ", error);
    return NextResponse.json(
      { message: "Server is not responding, contact with the Administrator" },
      { status: 500 },
    );
  }
}
