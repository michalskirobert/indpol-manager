import { MessageParams } from "@/types/message";
import { Schema } from "mongoose";

export const MessageSchema = new Schema<MessageParams>(
  {
    senderId: { type: String, required: true },
    roomId: { type: String, required: true },
    recipientId: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);
