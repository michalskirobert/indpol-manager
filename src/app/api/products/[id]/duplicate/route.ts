import { getSession } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import { ProductProps, ProductStatus } from "@/types/products";
import { DATE_FORMATS } from "@/utils";
import { format } from "date-fns";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export const POST = async (_: Request, { params }: Params) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const collection = await getCollection("store", "products");

    const foundProduct = await collection.findOne<ProductProps>({
      _id: new ObjectId(params.id),
    });

    if (!foundProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );

    const { _id, createdDate, updatedDate, ...product } = foundProduct;

    const duplicatedProduct = {
      ...product,
      name: `${product.name} (duplicated at ${format(new Date(), DATE_FORMATS.dateTime)})`,
      status: ProductStatus.Draft,
    };

    const res = await collection.insertOne(duplicatedProduct);

    if (!res.insertedId) {
      return NextResponse.json(
        {
          message:
            "ID cannot be assigned. Back to list and find duplicated product",
        },
        { status: 417 },
      );
    }

    return NextResponse.json({ id: res.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server not responed" },
      { status: 500 },
    );
  }
};
