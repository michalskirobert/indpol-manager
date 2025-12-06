import {
  ChatroomParams,
  MessageParams,
  ProcessedChatroomParams,
} from "@typings/message";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import {
  ChatMessagesArgs,
  ChatMessagesResponse,
  CreateChatroomArgs,
  SendMessageArgs,
} from "./types";
import { TableData } from "@/types/table";

import qs from "qs";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMessagesCount: build.query<{ count: number }, void>({
      query: () => ({
        url: `${INSTANCES_URLS.messages}/unread-count`,
      }),
    }),
    getChatMessages: build.query<ChatMessagesResponse, ChatMessagesArgs>({
      query: ({ id, params: { skip, take } }) => ({
        url: `${INSTANCES_URLS.messages}/${id}?${qs.stringify({ skip, take })}`,
      }),
    }),
    sendMessage: build.mutation<MessageParams, SendMessageArgs>({
      query: (body) => ({
        url: `${INSTANCES_URLS.messages}/send`,
        data: body,
        method: "POST",
      }),
    }),
    getChatroomsCount: build.query<{ count: number }, void>({
      query: () => ({
        url: `${INSTANCES_URLS.chatroom}/unread-count`,
      }),
    }),
    getChatrooms: build.query<ProcessedChatroomParams[], void>({
      query: () => ({
        url: INSTANCES_URLS.chatroom,
      }),
    }),
    createChatroom: build.mutation<ChatroomParams[], CreateChatroomArgs>({
      query: (body) => ({
        url: INSTANCES_URLS.chatroom,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useGetMessagesCountQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useCreateChatroomMutation,
  useGetChatroomsQuery,
  useGetChatroomsCountQuery,
  useLazyGetChatMessagesQuery,
} = messagesApi;
