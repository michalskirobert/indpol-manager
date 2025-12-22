import { getCollection } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const _id = new ObjectId(params.id);
    const collection = await getCollection("store", "products");

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
