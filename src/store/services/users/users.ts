import { UserProps } from "@/types/user";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import { ChangeUserDataArgs } from "./types";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<UserProps, string>({
      query: (id) => ({
        url: `${INSTANCES_URLS.users}/${id}`,
      }),
    }),
    changeUserData: build.mutation<UserProps, ChangeUserDataArgs>({
      query: ({ body, id }) => ({
        url: `${INSTANCES_URLS.users}/${id}`,
        data: body,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useChangeUserDataMutation,
} = usersApi;
