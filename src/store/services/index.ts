import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

import qs from "qs";

import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-toastify";

export interface TResponseError {
  status: number;
  message: string;
  errors?: { message: string[] };
}

export const getQueryString = <T>(queryParams?: Partial<T>) =>
  `${qs.stringify(queryParams, { allowDots: true })}`;

const axiosBaseQuery =
  ({
    baseUrl = "",
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    { status: string | number; data?: any }
  > =>
  async ({ url, method = "GET", data, params, headers, responseType }) => {
    try {
      const result = await axios({
        url: `${baseUrl}/${url}`,
        method,
        data,
        params,
        headers,
        responseType: responseType || "json",
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as TResponseError;

      if (responseData?.errors) {
        const errors = responseData.errors;

        if (Array.isArray(errors)) {
          const details = errors?.[0]?.details;
          if (details) {
            toast.error(details);
          }
        } else {
          const errorMessage = errors?.message?.[0];
          toast.error(errorMessage || "");
        }
      }

      return {
        error: {
          status: axiosError.response?.status || 500,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: [],
  baseQuery: axiosBaseQuery({ baseUrl: "/api" }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
