import { UserProps } from "./user";

export type NotificationType = "info" | "update";

export type NotificationParams = {
  _id: string;
  readBy: string[];
  type: NotificationType;
  content: string;
  createdAt: Date | null;
  icon: string;
  author: {
    fullname: string;
    id: string;
    jobPosition: UserProps["jobPosition"];
  };
};
