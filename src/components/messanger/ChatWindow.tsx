"use client";

import { Typography, Avatar, Textarea, Chip } from "@material-tailwind/react";
import { useAppSelector } from "@/store";
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "@/store/services/messages";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { MessagesSkeleton } from "./MessagesSkeleton";
import { CustomButton } from "../shared/button/CustomButton";
import { MoreHorizontalIcon, Send } from "lucide-react";
import {
  ChatMessagesArgs,
  SendMessageArgs,
} from "@/store/services/messages/types";
import { MessageParams } from "@/types/message";
import { format } from "date-fns";
import { checkIsUserOnline } from "@/utils/check-is-user-online";
import { useSession } from "next-auth/react";

export default function ChatWindow() {
  const { selectedUser } = useAppSelector(({ messages }) => messages);

  const [pagination, setPagination] = useState<ChatMessagesArgs["params"]>({
    take: 20,
    skip: 0,
  });

  const session = useSession();

  const sessionUserId = session.data?.user.id;

  const {
    data: messages,
    isLoading: isLoadingMessages,
    isSuccess,
  } = useGetChatMessagesQuery(
    { id: selectedUser?.id!, params: pagination },
    {
      skip: !selectedUser?.id,
      pollingInterval: 5000,
    },
  );

  const [send, { isLoading }] = useSendMessageMutation();

  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<MessageParams[]>([]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrolledDownRef = useRef(false);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      isScrolledDownRef.current = isAtBottom;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !selectedUser?.id) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const body: SendMessageArgs = {
      content: newMessage,
      recipientId: selectedUser.id,
    };

    const sentMessage = await send(body).unwrap();

    setNewMessage("");

    setChatMessages((prev) => {
      const merged = [...prev, sentMessage];
      return merged.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    });

    if (isScrolledDownRef.current) {
      timeoutRef.current = setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  useEffect(() => {
    if (!isSuccess || !messages) return;

    setChatMessages((prev) => {
      const newItems = messages.filter(
        (msg) => !prev?.find((m) => m._id === msg._id),
      );

      const merged = [...newItems, ...prev];
      if (isScrolledDownRef.current) {
        setTimeout(() => scrollToBottom(), 0);
      }
      return merged.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    });
  }, [messages, isSuccess]);

  useLayoutEffect(() => {
    if (isScrolledDownRef.current || !isSuccess) return;

    const timeout = setTimeout(() => scrollToBottom(), 0);
    isScrolledDownRef.current = true;
    return () => clearTimeout(timeout);
  }, [messages, isSuccess]);

  if (isLoadingMessages) return <MessagesSkeleton />;

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
            <Chip
              variant="ghost"
              size="sm"
              className="ml-2"
              value={
                checkIsUserOnline(selectedUser.lastSeenAt)
                  ? "online"
                  : "offline"
              }
              color={
                checkIsUserOnline(selectedUser.lastSeenAt)
                  ? "green"
                  : "blue-gray"
              }
            />
          </header>
          <main
            ref={messagesContainerRef}
            className="flex-grow space-y-4 overflow-y-auto bg-gray-50 px-6 py-4"
          >
            {chatMessages.length > 0 &&
              chatMessages.length % pagination.take === 0 && (
                <div className="flex items-center justify-center">
                  <CustomButton
                    icon={<MoreHorizontalIcon />}
                    content="See more messages"
                    variant="text"
                    onClick={() => {
                      const oldestMessage = chatMessages[0];

                      if (!oldestMessage) return;

                      setPagination({
                        ...pagination,
                        skip: pagination.skip + pagination.take,
                      });
                    }}
                  />
                </div>
              )}
            {chatMessages?.length ? (
              chatMessages?.map((msg) => {
                const isFromMe =
                  msg.senderId.toString() === sessionUserId?.toString();
                return (
                  <div
                    key={msg._id.toString()}
                    className={`flex max-w-[75%] flex-col ${
                      isFromMe ? "ml-auto self-end" : "mr-auto self-start"
                    }`}
                  >
                    <Typography variant="small" color="gray">
                      {format(msg.createdAt, "dd.MM.yyyy, HH:mm")}
                    </Typography>
                    <div
                      className={`whitespace-pre-wrap break-words rounded-lg px-4 py-2 shadow-sm ${
                        isFromMe
                          ? "rounded-br-none bg-blue-600 text-white"
                          : "rounded-bl-none bg-gray-200 text-gray-900"
                      }`}
                    >
                      <Typography
                        variant="small"
                        className="whitespace-pre-wrap"
                      >
                        {msg.content}
                      </Typography>
                    </div>
                    {isFromMe && (
                      <Typography variant="small">
                        {msg.read ? "Read" : "Unseen"}
                      </Typography>
                    )}
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
