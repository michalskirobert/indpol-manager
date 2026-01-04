import { ProductProps } from "@/types/products";

export const processProducts = (products: ProductProps[]) =>
  products.map(
    ({
      _id,
      name,
      brand,
      category,
      createdAt,
      price,
      stockLimit,
      discount,
      status,
      updatedAt,
    }) => ({
      id: _id,
      name,
      brand,
      category,
      createdAt,
      price,
      stockLimit,
      discount,
      status,
      updatedAt,
    }),
  );

export const processVariants = (products: ProductProps[]) =>
  products.map(({ _id, name, createdAt, updatedAt }) => ({
    id: _id,
    name,
    createdAt,
    updatedAt,
  }));
