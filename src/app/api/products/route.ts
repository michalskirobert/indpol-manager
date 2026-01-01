import { ProductFormValues } from "@/components/product-form/types";
import { errorBadRequestHandler } from "@lib/api/error-bad-request";
import { getSession } from "@lib/auth";
import { getCollection } from "@lib/mongodb";
import { applyFiltersAndSort } from "@/lib/query/mongo-filters";
import { ProductProps } from "@/types/products";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const db = await getCollection("store", "products");

    const url = new URL(request.url);

    const { filters, sort, skip, take } = applyFiltersAndSort(url.searchParams);

    const cursor = db.find(filters).skip(skip).limit(take);

    if (Object.keys(sort).length > 0) {
      cursor.sort(sort);
    }

    const totalCount = await db.countDocuments(filters);
    const products = await cursor.toArray();

    return NextResponse.json(
      {
        items: products,
        totalCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      });
    }

    const body = (await req.json()) as ProductFormValues;

    if (!body) {
      return NextResponse.json(
        { message: "There is no payload in POST request" },
        { status: 400 },
      );
    }

    const errorMessage = errorBadRequestHandler<keyof ProductProps>(
      ["name", "brand", "category", "desc", "images", "status"],
      body,
    );

    if (errorMessage) {
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const collection = await getCollection("store", "products");

    await collection.insertOne(body);

    return NextResponse.json(
      { message: "Product has been added" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server not responed" },
      { status: 500 },
    );
  }
};
