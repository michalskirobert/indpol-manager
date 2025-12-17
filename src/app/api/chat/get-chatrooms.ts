import { getCollection } from "@/lib/mongodb";
import { ChatroomParams, ProcessedChatroomParams } from "@/types/message";
import { UserProps } from "@/types/user";
import { Session } from "next-auth";

import { ObjectId } from "mongodb";

export const getChatrooms = async (
  session: Session,
): Promise<ProcessedChatroomParams[]> => {
  const chatroomDb = await getCollection("BackOffice", "chatrooms");
  const userDb = await getCollection("BackOffice", "users");
  const chatroomsCursor = chatroomDb
    .find<ChatroomParams>({
      participants: session?.user.id,
    })
    .sort({ updatedAt: -1 });

  const chatrooms = await chatroomsCursor.toArray();

  const processedChatrooms = await Promise.all(
    chatrooms.map(async (room) => {
      const otherUserId = room.participants.find(
        (id) => id !== session?.user.id,
      )!;

      const sender = await userDb.findOne<UserProps>({
        _id: new ObjectId(otherUserId),
      });
      return {
        ...room,
        senderProfile: sender!,
      };
    }),
  );

  return processedChatrooms;
};
