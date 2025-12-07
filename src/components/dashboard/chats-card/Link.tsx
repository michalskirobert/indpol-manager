"use client";

import { useAppDispatch } from "@/store";
import { setSelectedUser } from "@/store/slices/messages";
import { UserProps } from "@/types/user";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  senderProfile: UserProps;
}

export const Link = ({ senderProfile, children }: Props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const openChat = () => {
    dispatch(setSelectedUser(senderProfile));

    router.push("/messages");
  };

  return (
    <button
      className="flex w-full items-center gap-4.5 px-7.5 py-3 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-2 dark:focus-visible:bg-dark-2"
      onClick={openChat}
    >
      {children}
    </button>
  );
};
