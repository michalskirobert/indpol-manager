import { getChatrooms } from "@/app/api/chat/get-chatrooms";
import ChatWindow from "@/components/messanger/ChatWindow";
import Chatrooms from "@/components/messanger/Chatrooms";

import { connectDB } from "@/types/mongodb";

import { getSession } from "@lib/auth";
import { NextResponse } from "next/server";

export default async function MessagesPage() {
  await connectDB("BackOffice");

  const session = await getSession();

  if (!session) {
    return NextResponse.redirect("/not-authorized");
  }

  const chatrooms = await getChatrooms(session);

  const filteredChatrooms = JSON.stringify(
    chatrooms.filter(({ senderProfile }) => senderProfile?._id),
  );

  return (
    <div className="flex h-[82vh] flex-col gap-4 bg-gray-50 p-4 dark:bg-gray-900 md:flex-row">
      <div className="max-h-[82vh] w-full overflow-y-auto rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-1/3">
        <Chatrooms chatrooms={filteredChatrooms} />
      </div>
      <div className="flex max-h-[82vh] w-full flex-col rounded-lg bg-white shadow-md dark:bg-gray-800 md:w-2/3">
        <ChatWindow />
      </div>
    </div>
  );
}
