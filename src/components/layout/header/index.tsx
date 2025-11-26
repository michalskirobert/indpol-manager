"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";

import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

import appData from "./../../../../package.json";
import { APP_NAME } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  setIsNotificationModalOpen,
  toggleSidebar,
} from "@/store/slices/layout";
import { Modal } from "./notification-modal";

export function Header() {
  const isNotificationOpen = useAppSelector(
    (state) => state.layout.isNotificationModalOpen,
  );

  const dispatch = useAppDispatch();

  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
      </button>

      {isMobile && (
        <Link href={"/"} className="max-[430px]:hidden min-[375px]:ml-4 ml-2">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          {APP_NAME}
        </h1>
        <p className="font-medium">Version: {appData.version}</p>
      </div>

      <div className="min-[375px]:gap-4 flex flex-1 items-center justify-end gap-2">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="max-[1015px]:size-5 pointer-events-none absolute left-5 top-1/2 -translate-y-1/2" />
        </div>

        <ThemeToggleSwitch />

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
      <Modal
        {...{
          open: isNotificationOpen,
          toggle: () =>
            dispatch(setIsNotificationModalOpen(!isNotificationOpen)),
        }}
      />
    </header>
  );
}
