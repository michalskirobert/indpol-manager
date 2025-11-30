import { ChatroomParams, MessageParams } from "@typings/message";
import { apiSlice } from "../../api";
import { INSTANCES_URLS } from "../../utils";
import { CreateChatroomArgs, SendMessageArgs } from "./types";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMessagesCount: build.query<{ count: number }, void>({
      query: () => ({
        url: `${INSTANCES_URLS.messages}/unread-count`,
      }),
    }),
    getChatMessages: build.query<MessageParams[], string>({
      query: (id) => ({
        url: `${INSTANCES_URLS.messages}/${id}`,
      }),
    }),
    sendMessage: build.mutation<MessageParams[], SendMessageArgs>({
      query: (body) => ({
        url: `${INSTANCES_URLS.messages}/send`,
        data: body,
        method: "POST",
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
} = messagesApi;
