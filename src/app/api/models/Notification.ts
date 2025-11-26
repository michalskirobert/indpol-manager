import { Schema, model, models } from "mongoose";
import type { NotificationParams } from "@/types/notifications";

const NotificationSchema = new Schema<NotificationParams>(
  {
    readBy: { type: [String], required: true, index: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);

const Notification =
  models.Notification ||
  model<NotificationParams>("Notification", NotificationSchema);

export default Notification;
