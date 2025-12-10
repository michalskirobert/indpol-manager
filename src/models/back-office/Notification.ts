import { Schema } from "mongoose";
import type { NotificationParams } from "@/types/notifications";

export const NotificationSchema = new Schema<NotificationParams>(
  {
    readBy: { type: [String], required: true, index: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.Mixed, required: true },
    updateDetails: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);
