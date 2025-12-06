import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import { StatsResponse } from "./types";

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStats: build.query<StatsResponse, void>({
      query: () => ({
        url: INSTANCES_URLS.stats,
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
