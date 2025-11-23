import { ChangeUserDataArgs } from "@/store/services/users/types";
import { UserProps } from "@/types/user";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  MutationActionCreatorResult,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { AxiosRequestConfig } from "axios";

export interface SettingsFormProps {
  id: string;
  data: UserProps | null;
  isUpdating: boolean;
  updateUser: (arg: ChangeUserDataArgs) => MutationActionCreatorResult<
    MutationDefinition<
      ChangeUserDataArgs,
      BaseQueryFn<
        {
          url: string;
          method?: AxiosRequestConfig["method"];
          data?: AxiosRequestConfig["data"];
          params?: AxiosRequestConfig["params"];
          headers?: AxiosRequestConfig["headers"];
          responseType?: AxiosRequestConfig["responseType"];
        },
        unknown,
        {
          status: string | number;
          data?: UserProps;
        }
      >,
      never,
      UserProps,
      "apiSlice",
      unknown
    >
  >;
}

export interface SettingsProfileFormArgs
  extends Partial<Omit<UserProps, "fullname" | "email">>,
    Pick<UserProps, "fullname" | "email"> {
  oldPassword: string;
  newPassword: string;
}
