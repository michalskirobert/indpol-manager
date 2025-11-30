import { UserProps } from "@/types/user";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import { ChangeUserDataArgs } from "./types";
import { TableData } from "@/types/table";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<UserProps, string>({
      query: (id) => ({
        url: `${INSTANCES_URLS.users}/${id}`,
      }),
    }),
    getUsers: build.query<TableData<UserProps>, void>({
      query: () => ({
        url: INSTANCES_URLS.users,
      }),
    }),
    changeUserData: build.mutation<UserProps, ChangeUserDataArgs>({
      query: ({ body, id }) => ({
        url: `${INSTANCES_URLS.users}/${id}`,
        data: body,
        method: "PATCH",
      }),
    }),
    updateLastSeen: build.mutation<UserProps, void>({
      query: () => ({
        url: `${INSTANCES_URLS.users}/lastSeen`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useChangeUserDataMutation,
  useGetUsersQuery,
  useUpdateLastSeenMutation,
} = usersApi;
