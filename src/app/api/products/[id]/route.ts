import { getCollection } from "@lib/mongodb";
import { getSession } from "@lib/auth";

import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { Params } from "@/types/global";

const collection = await getCollection("store", "products");

export const PUT = async (req: Request, { params }: Params) => {
  const session = await getSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });
  }

  try {
    const { id } = await params;

    const foundProduct = collection.findOne({
      _id: new ObjectId(id),
    });

    if (!foundProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const body = (await req.json()) || {};

    const { _id, ...rest } = body;

    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...rest, updatedAt: new Date() } },
    );

    return NextResponse.json(
      { message: "Product has been updated!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server not respont" },
      { status: 500 },
    );
  }
};

export const DELETE = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;
    const _id = new ObjectId(id);

    const foundProduct = await collection.findOne({ _id });

    if (!foundProduct) {
      return NextResponse.json(
        { message: "Product has not found" },
        { status: 404 },
      );
    }

    await collection.deleteOne({ _id });

    return NextResponse.json(
      { message: `"${foundProduct.name}" has been removed` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server not respont" },
      { status: 500 },
    );
  }
};
