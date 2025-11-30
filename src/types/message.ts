import { ObjectId } from "mongoose";

export type MessageParams = {
  _id: ObjectId;
  senderId: string;
  recipientId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatroomParams = {
  roomId: string;
  participants: [string, string];
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: MessageParams;
};
