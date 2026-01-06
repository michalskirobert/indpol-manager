import { ProductProps } from "@/types/products";

export interface ProductList extends Pick<
  ProductProps,
  | "brand"
  | "category"
  | "createdAt"
  | "updatedAt"
  | "discount"
  | "name"
  | "status"
  | "stockLimit"
> {
  id: string;
}
