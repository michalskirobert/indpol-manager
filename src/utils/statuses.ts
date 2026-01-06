import { ProductStatus } from "@/types/products";

export const productStatuses: {
  label: "Draft" | "Withdraw" | "Published";
  value: ProductStatus;
}[] = [
  { label: "Draft", value: ProductStatus.Draft },
  { label: "Published", value: ProductStatus.Published },
  { label: "Withdraw", value: ProductStatus.Withdraw },
];
