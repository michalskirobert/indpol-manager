import { NotificationType } from "@/types/notifications";

export const getNotificationType = (type: NotificationType | undefined) => {
  if (!type) return "Uknown";

  const source: Record<NotificationType, string> = {
    info: "Attention",
    update: "New update",
  };

  return source[type];
};
