import { NotificationType } from "@/types/notifications";

export const getNotificationType = (type: NotificationType) => {
  const source: Record<NotificationType, string> = {
    info: "Attention",
    update: "New update",
  };

  return source[type] ?? source.info;
};
