"use client";

import { useAppSelector } from "@/store";
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "@/store/services/messages";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  ChatMessagesArgs,
  SendMessageArgs,
} from "@/store/services/messages/types";
import { MessageParams } from "@/types/message";
import { useSession } from "next-auth/react";

export const useChatWindowService = () => {
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

  return {
    isLoadingMessages,
    selectedUser,
    sessionUserId,
    messagesContainerRef,
    messagesEndRef,
    chatMessages,
    pagination,
    isLoading,
    newMessage,
    setPagination,
    sendMessage,
    setNewMessage,
  };
};
