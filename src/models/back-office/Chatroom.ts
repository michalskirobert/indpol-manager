import { ChatroomParams, MessageParams } from "@/types/message";
import { Schema, model, models } from "mongoose";

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

const Chatroom =
  models.Chatroom || model<ChatroomParams>("Chatroom", ChatroomSchema);

export default Chatroom;
