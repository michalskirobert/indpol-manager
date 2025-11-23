import { apiSlice } from "../api";
import { INSTANCES_URLS } from "../utils";

export const uploadApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<{ url: string }, FormData>({
      query: (body) => ({
        url: INSTANCES_URLS.upload,
        method: "POST",
        data: body,
      }),
    }),
    deleteImage: build.mutation<void, { public_id: string }>({
      query: (body) => ({
        url: INSTANCES_URLS.upload,
        data: body,
        method: "delete",
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = uploadApi;
