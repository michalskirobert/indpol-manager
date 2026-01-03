import { ProductProps } from "@/types/products";

export const processProducts = (products: ProductProps[]) =>
  products.map(
    ({
      _id,
      name,
      brand,
      category,
      createdDate,
      price,
      stockLimit,
      discount,
      status,
      updatedDate,
    }) => ({
      id: _id,
      name,
      brand,
      category,
      createdDate,
      price,
      stockLimit,
      discount,
      status,
      updatedDate,
    }),
  );
