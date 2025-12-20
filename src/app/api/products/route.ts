import { getCollection } from "@/lib/mongodb";
import { applyFiltersAndSort } from "@/lib/table-filters";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const db = await getCollection("store", "products");

    const url = new URL(request.url);

    const { filters, sort, skip, take } = applyFiltersAndSort(url.searchParams);

    const cursor = db.find(filters).skip(skip).limit(take);

    if (Object.keys(sort).length > 0) {
      cursor.sort(sort as any);
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
