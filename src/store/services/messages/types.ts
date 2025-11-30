import { MessageParams } from "@/types/message";

export type SendMessageArgs = Pick<MessageParams, "content" | "recipientId">;
export type CreateChatroomArgs = { recipientId: string };
