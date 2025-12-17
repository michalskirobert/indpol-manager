import { ObjectId } from "mongoose";
import { UserProps } from "./user";

export type MessageParams = {
  _id?: ObjectId;
  senderId: string;
  recipientId: string;
  roomId: string;
  content: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ChatroomParams = {
  _id?: ObjectId;
  roomId: string;
  participants: [string, string];
  createdAt?: Date;
  updatedAt?: Date;
  lastMessage?: Partial<MessageParams>;
};

export interface ProcessedChatroomParams extends ChatroomParams {
  senderProfile: UserProps;
}
