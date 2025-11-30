"use client";

import { Typography, Avatar, Textarea } from "@material-tailwind/react";
import { useAppSelector } from "@/store";
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "@/store/services/messages";
import { useState, useRef, useEffect } from "react";
import { MessagesSkeleton } from "./MessagesSkeleton";
import { CustomButton } from "../shared/button/CustomButton";
import { Send } from "lucide-react";
import { SendMessageArgs } from "@/store/services/messages/types";
import { MessageParams } from "@/types/message";
import { format } from "date-fns";

export default function ChatWindow() {
  const { selectedUser } = useAppSelector(({ messages }) => messages);

  const {
    data: messages,
    isFetching,
    isSuccess,
  } = useGetChatMessagesQuery(selectedUser?.id!, {
    skip: !selectedUser?.id,
  });

  console.log(selectedUser?.id);
  console.log(messages);

  const [send, { isLoading }] = useSendMessageMutation();

  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<MessageParams[]>(
    messages || [],
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    if (!selectedUser?.id) return;

    const body: SendMessageArgs = {
      content: newMessage,
      recipientId: selectedUser.id,
    };

    const res = await send(body).unwrap();
    console.log(res);
    setNewMessage("");

    setChatMessages(res);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isSuccess) return;

    scrollToBottom();
    setChatMessages(messages);
  }, [messages, isSuccess]);

  if (isFetching) return <MessagesSkeleton />;

  return (
    <div className="flex h-full max-h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
      {selectedUser ? (
        <>
          <header className="flex items-center border-b border-gray-200 bg-gray-50 px-6 py-4">
            <Avatar
              src={
                selectedUser.profileImgSrc ||
                `/images/user/empty_img_${selectedUser.gender}.jpg`
              }
              alt={selectedUser.fullname}
              size="md"
              variant="circular"
              className="mr-4"
            />
            <Typography variant="h6" className="font-semibold text-gray-800">
              {selectedUser.fullname}
            </Typography>
          </header>
          <main className="flex-grow space-y-4 overflow-y-auto bg-gray-50 px-6 py-4">
            {chatMessages?.length ? (
              chatMessages.map((msg) => {
                const isFromSelectedUser =
                  msg.senderId.toString() === selectedUser.id.toString();
                return (
                  <div>
                    <Typography variant="small" color="gray">
                      {format(msg.createdAt, "dd.MM.yyyy, HH:mm")}
                    </Typography>
                    <div
                      key={msg._id.toString()}
                      className={`max-w-[75%] whitespace-pre-wrap break-words rounded-lg px-4 py-2 shadow-sm ${
                        isFromSelectedUser
                          ? "self-start rounded-bl-none bg-gray-200 text-gray-900"
                          : "self-end rounded-br-none bg-blue-600 text-white"
                      }`}
                    >
                      <Typography
                        variant="small"
                        className="whitespace-pre-wrap"
                      >
                        {msg.content}
                      </Typography>
                    </div>
                    <Typography variant="small">
                      {msg.read ? "Read" : "Unseen"}
                    </Typography>
                  </div>
                );
              })
            ) : (
              <Typography
                variant="small"
                className="mt-6 text-center text-gray-400"
              >
                No messages yet. Start the conversation!
              </Typography>
            )}
            <div ref={messagesEndRef} />
          </main>
          <footer className="flex items-center gap-3 border-t border-gray-200 bg-white px-6 py-4">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              variant="static"
              placeholder="Type a message..."
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              size="md"
              containerProps={{ className: "m-0" }}
            />
            <CustomButton
              variant="filled"
              color="blue"
              isLoading={isLoading}
              onClick={sendMessage}
              disabled={newMessage.trim() === ""}
              className="whitespace-nowrap"
              content="Send"
              icon={<Send />}
            />
          </footer>
        </>
      ) : (
        <div className="flex h-full flex-grow items-center justify-center rounded-lg bg-gray-50">
          <Typography variant="h6" className="px-4 text-center text-gray-400">
            Select chatroom to start chatting
          </Typography>
        </div>
      )}
    </div>
  );
}
