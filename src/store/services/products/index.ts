import { ProductFormValues } from "@/components/product-form/types";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    insertProduct: build.mutation<{ message: string }, ProductFormValues>({
      query: (body) => ({
        url: INSTANCES_URLS.products,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const { useInsertProductMutation } = productsApi;
