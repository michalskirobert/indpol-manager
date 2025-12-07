import { getBOModels } from "@/models/dbModels";
import { ChatroomParams, ProcessedChatroomParams } from "@/types/message";
import { UserProps } from "@/types/user";
import { Session } from "next-auth";

export const getChatrooms = async (
  session: Session,
): Promise<ProcessedChatroomParams[]> => {
  const { Chatroom, User } = await getBOModels();

  const chatrooms = await Chatroom.find({
    participants: session?.user.id,
  })
    .sort({ updatedAt: -1 })
    .lean<ChatroomParams[]>();

  const processedChatrooms = await Promise.all(
    chatrooms.map(async (room) => {
      const otherUserId = room.participants.find(
        (id) => id !== session?.user.id,
      )!;

      const sender = await User.findById(otherUserId).lean<UserProps>();
      return {
        ...room,
        senderProfile: sender!,
      };
    }),
  );

  return processedChatrooms;
};
