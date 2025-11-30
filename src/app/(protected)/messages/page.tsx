import ChatWindow from "@/components/messanger/ChatWindow";
import MessagesList from "@/components/messanger/MessagesList";
import Chatroom from "@/models/Chatroom";
import User from "@/models/User";

import { connectDB } from "@/types/mongodb";

import { getSession } from "@lib/auth";
import { ChatroomParams } from "@typings/message";
import { UserProps } from "@typings/user";

export interface ProcessedChatroomParams extends ChatroomParams {
  senderProfile: UserProps;
}

export default async function MessagesPage() {
  await connectDB("BackOffice");

  const session = await getSession();

  const chatrooms = await Chatroom.find({
    participants: session?.user.id,
  })
    .sort({ updatedAt: -1 })
    .lean<ChatroomParams[]>();

  console.log(chatrooms);

  const processedChatrooms = await Promise.all(
    chatrooms.map(async (room) => {
      const otherUserId = room.participants.find(
        (id) => id !== session?.user.id,
      )!;

      console.log(room.participants);

      const sender = await User.findById(otherUserId).lean<UserProps>();
      return {
        ...room,
        senderProfile: sender!,
      };
    }),
  );

  return (
    <div className="flex h-[82vh] flex-col gap-4 bg-gray-50 p-4 dark:bg-gray-900 md:flex-row">
      <div className="max-h-[82vh] w-full overflow-y-auto rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-1/3">
        <MessagesList
          chatrooms={processedChatrooms.filter(
            ({ senderProfile }) => senderProfile?._id,
          )}
        />
      </div>
      <div className="flex max-h-[82vh] w-full flex-col rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-2/3">
        <ChatWindow />
      </div>
    </div>
  );
}
