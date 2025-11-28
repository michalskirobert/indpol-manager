import { UserProps } from "./user";

export type NotificationType = "info" | "update";

export type NotificationParams = {
  _id: string;
  readBy: string[];
  type: NotificationType;
  content: string;
  createdAt: Date | null;
  updatedAt?: Date | null;
  icon: string;
  updateDetails?: {
    url: string;
    version: string;
  };
  author: {
    fullname: string;
    id: string;
    jobPosition: UserProps["jobPosition"];
  };
};
