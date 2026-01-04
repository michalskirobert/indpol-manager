import { ProductFormValues } from "@/components/products/product-form/types";

export type SuccessResponse = {
  message: string;
};

export type UpdateProductArgs = {
  id: string;
  body: ProductFormValues;
};
