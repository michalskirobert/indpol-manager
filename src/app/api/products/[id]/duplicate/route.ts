import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import { Params } from "@/types/global";
import { ProductProps, ProductStatus } from "@/types/products";
import { DATE_FORMATS } from "@/utils";
import { format } from "date-fns";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (_: Request, { params }: Params) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return NextResponse.json(
        { message: "User is not authorized" },
        { status: 401 },
      );
    }
    const { id } = await params;
    const collection = await getCollection("store", "products");

    const foundProduct = await collection.findOne<ProductProps>({
      _id: new ObjectId(id),
    });

    if (!foundProduct) {
      return NextResponse.json(
        { message: "The product does not exist" },
        { status: 404 },
      );
    }

    const { _id, createdAt, updatedAt, ...product } = foundProduct;

    const duplicatedProduct = {
      ...product,
      name: `${product.name} (duplicated at ${format(new Date(), DATE_FORMATS.dateTime)})`,
      status: ProductStatus.Draft,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    const res = await collection.insertOne(duplicatedProduct);

    if (!res.insertedId) {
      return NextResponse.json(
        {
          message:
            "Failed to create duplicated product. Please return to the product list and check.",
        },
        { status: 417 },
      );
    }

    return NextResponse.json({ id: res.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server did not respond" },
      { status: 500 },
    );
  }
};
