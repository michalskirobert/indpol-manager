import { NotificationParams } from "@/types/notifications";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsCount: build.query<{ count: number }, void>({
      query: () => ({
        url: `${INSTANCES_URLS.notifications}/unread-count`,
      }),
    }),
    markNotificationsAsRead: build.mutation<void, string>({
      query: (id) => ({
        url: `${INSTANCES_URLS.notifications}/${id}/read`,
        method: "PATCH",
      }),
    }),
    getNotifications: build.query<NotificationParams[], void>({
      query: () => ({
        url: INSTANCES_URLS.notifications,
      }),
    }),
  }),
});

export const {
  useGetNotificationsCountQuery,
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = notificationsApi;
