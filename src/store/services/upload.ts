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
  }),
});

export const { useUploadImageMutation } = uploadApi;
