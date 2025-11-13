import { RegisterUserArgs, SignInArgs, UserProps } from "@/types/user";
import { apiSlice } from ".";
import { INSTANCES_URLS } from "../utils";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<UserProps, SignInArgs>({
      query: (body) => ({
        url: INSTANCES_URLS.signIn,
        body,
      }),
    }),
    signUp: build.mutation<UserProps, RegisterUserArgs>({
      query: (body) => ({
        url: INSTANCES_URLS.register,
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
