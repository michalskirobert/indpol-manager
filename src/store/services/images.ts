import { apiSlice } from "../api";
import { INSTANCES_URLS } from "../utils";

type Resource = {
  bytes: number;
  created_at: string;
  format: string;
  height: number;
  public_id: string;
  secure_url: string;
  width: number;
};

interface ImagesResponseParams {
  count: number;
  resources: Resource[];
  folder: string;
}

export const uploadApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<{ url: string }, FormData>({
      query: (body) => ({
        url: `${INSTANCES_URLS.images}/upload`,
        method: "POST",
        data: body,
      }),
    }),
    getImages: build.query<ImagesResponseParams, { folder: string }>({
      query: ({ folder }) => ({
        url: `${INSTANCES_URLS.images}?folder=${folder}`,
      }),
    }),
    deleteImage: build.mutation<void, { public_id: string[] }>({
      query: (body) => ({
        url: INSTANCES_URLS.images,
        data: body,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useDeleteImageMutation,
  useGetImagesQuery,
} = uploadApi;
