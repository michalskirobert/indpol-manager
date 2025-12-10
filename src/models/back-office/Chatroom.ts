import { ChatroomParams } from "@/types/message";
import { Schema } from "mongoose";

export const ChatroomSchema = new Schema<ChatroomParams>(
  {
    roomId: { type: String, required: true, unique: true },
    participants: {
      type: [String],
      required: true,
      validate: [
        (val: string[]) => val.length === 2,
        "Participants must be exactly 2 users",
      ],
    },
    lastMessage: {
      content: { type: String },
      senderId: { type: String },
      createdAt: { type: Date },
      read: { type: Boolean },
    },
  },
  {
    timestamps: true,
  },
);
