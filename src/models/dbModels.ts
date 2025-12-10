import { StoreUserSchema } from "./store/User";
import { OrderSchema } from "./store/Order";
import { ProductSchema } from "./store/Product";

import { ChatroomSchema } from "./back-office/Chatroom";
import { NotificationSchema } from "./back-office/Notification";
import { UserSchema } from "./back-office/User";
import { MessageSchema } from "./back-office/Message";

import { connectDB } from "@/lib/mongodb";

export const getStoreModels = async () => {
  const dbStore = await connectDB("store");

  return {
    Order: dbStore.models.Order || dbStore.model("Order", OrderSchema),
    User: dbStore.models.User || dbStore.model("User", StoreUserSchema),
    Product: dbStore.models.Product || dbStore.model("Product", ProductSchema),
  };
};

export const getBOModels = async () => {
  const dbBO = await connectDB("BackOffice");

  return {
    Chatroom: dbBO.models.Chatroom || dbBO.model("Chatroom", ChatroomSchema),
    Message: dbBO.models.Message || dbBO.model("Message", MessageSchema),
    Notification:
      dbBO.models.Notification ||
      dbBO.model("Notification", NotificationSchema),
    User: dbBO.models.User || dbBO.model("User", UserSchema),
  };
};
