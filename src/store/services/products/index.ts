import { ProductFormValues } from "@/components/products/product-form/types";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import { PatchProductArgs, UpdateProductArgs } from "./types";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    insertProduct: build.mutation<{ message: string }, ProductFormValues>({
      query: (body) => ({
        url: INSTANCES_URLS.products,
        method: "POST",
        data: body,
      }),
    }),
    updateProduct: build.mutation<{ message: string }, UpdateProductArgs>({
      query: ({ body, id }) => ({
        url: `${INSTANCES_URLS.products}/${id}`,
        method: "PUT",
        data: body,
      }),
    }),
    patchProduct: build.mutation<{ message: string }, PatchProductArgs>({
      query: ({ body, id }) => ({
        url: `${INSTANCES_URLS.products}/${id}`,
        method: "patch",
        data: body,
      }),
    }),
    duplicateProduct: build.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `${INSTANCES_URLS.products}/${id}/duplicate`,
        method: "POST",
        body: null,
      }),
    }),
  }),
});

export const {
  useInsertProductMutation,
  useDuplicateProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
} = productsApi;
