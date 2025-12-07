import { StoreUserSchema } from "./store/User";
import { OrderSchema } from "./store/Order";
import { ProductSchema } from "./store/Product";

import { ChatroomSchema } from "./back-office/Chatroom";
import { MessageSchema } from "./back-office/Message";
import { NotificationSchema } from "./back-office/Notification";
import { UserSchema } from "./back-office/User";

import { connectDB } from "@/lib/mongodb";

export const getStoreModels = async () => {
  const dbStore = await connectDB("store");

  return {
    Order: dbStore.model("Order", OrderSchema),
    User: dbStore.model("User", StoreUserSchema),
    Product: dbStore.model("Product", ProductSchema),
  };
};

export const getBOModels = async () => {
  const dbBO = await connectDB("BackOffice");

  return {
    Chatroom: dbBO.model("Chatroom", ChatroomSchema),
    Message: dbBO.model("Message", MessageSchema),
    Notification: dbBO.model("Notification", NotificationSchema),
    User: dbBO.model("User", UserSchema),
  };
};
