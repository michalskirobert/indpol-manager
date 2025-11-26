"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/shared/Dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useLazyGetNotificationsCountQuery } from "@/store/services/notifications";
import { Bell } from "lucide-react";
import { Notifications } from "./Notifications";

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();

  const [fetchCount, { data: notificationsCount }] =
    useLazyGetNotificationsCountQuery();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchCount().unwrap();

      setCount(data.count);
    };

    fetch();

    return () => setCount(0);
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      fetchCount().unwrap();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className="grid size-12 place-items-center rounded-full border bg-gray-2 text-dark outline-none hover:text-primary focus-visible:border-primary focus-visible:text-primary dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-primary"
        aria-label="View Notifications"
      >
        <span className="relative">
          <Bell />

          {count > 0 && (
            <span
              className={cn(
                "absolute right-0 top-0 z-1 size-2 rounded-full bg-red-light ring-2 ring-gray-2 dark:ring-dark-3",
              )}
            >
              <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-light opacity-75" />
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent
        align={isMobile ? "end" : "center"}
        className="min-[380px]:min-w-[20rem] border border-stroke bg-white px-3.5 py-3 shadow-md dark:border-dark-3 dark:bg-gray-dark"
      >
        <div className="mb-1 flex items-center justify-between gap-2 px-2 py-1.5">
          <span className="text-lg font-medium text-dark dark:text-white">
            Notifications
          </span>
          <span className="rounded-md bg-primary px-[9px] py-0.5 text-xs font-medium text-white">
            {count}
          </span>
        </div>

        {isOpen && <Notifications toggle={() => setIsOpen((prev) => !prev)} />}
      </DropdownContent>
    </Dropdown>
  );
}
