import { MessageParams } from "@/types/message";
import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema<MessageParams>(
  {
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Message =
  models.Message || model<MessageParams>("Message", MessageSchema);

export default Message;
