import { ProductStatus } from "@/types/products";

export const status: Record<ProductStatus, string> = {
  [ProductStatus.Draft]: "Draft",
  [ProductStatus.Published]: "Published",
  [ProductStatus.Withdraw]: "Withdraw",
};

export const statusOptions: Record<"label" | "value", string>[] = [
  { label: "Draft", value: `${ProductStatus.Draft}` },
  { label: "Published", value: `${ProductStatus.Published}` },
  { label: "Withdraw", value: `${ProductStatus.Withdraw}` },
];
