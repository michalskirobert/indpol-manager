import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { applyFiltersAndSort } from "@/lib/query/mongo-filters";
import { ProductProps, ProductStatus } from "@/types/products";
import { getSession } from "@lib/auth";
import { NextResponse } from "next/server";
import { processVariants } from "../../helpers";

interface Params {
  params: { id: string };
}

export const GET = async (req: Request, { params: { id } }: Params) => {
  const session = await getSession();

  if (!session?.user.id) {
    return NextResponse.json(
      { message: "User is not authorized" },
      { status: 401 },
    );
  }

  try {
    const db = await getCollection("store", "products");

    const url = new URL(req.url);

    const { filters, sort, skip, take } = applyFiltersAndSort(url.searchParams);

    const product = await db.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const variantFilters = {
      ...filters,
      status: ProductStatus.Published,
      _id: { $ne: product._id },
      brand: product.brand,
      category: product.category,
    };

    const cursor = db.find<ProductProps>(variantFilters).skip(skip).limit(take);
    if (Object.keys(sort).length > 0) {
      cursor.sort(sort);
    }
    const totalCount = await db.countDocuments(variantFilters);
    const products = await cursor.toArray();

    return NextResponse.json(
      {
        items: processVariants(products),
        totalCount,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server is not responding" },
      { status: 500 },
    );
  }
};
