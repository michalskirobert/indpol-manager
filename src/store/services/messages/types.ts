import { MessageParams } from "@/types/message";

export type SendMessageArgs = Pick<MessageParams, "content" | "recipientId">;

export type CreateChatroomArgs = { recipientId: string };
export type ChatMessagesResponse = MessageParams[];
export type ChatMessagesArgs = {
  id: string;
  params: { take: number; skip: number };
};
