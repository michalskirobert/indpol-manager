"use client";

import {
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} from "@/store/services/notifications";
import { BellRing, DownloadCloud } from "lucide-react";
import Link from "next/link";
import { Loading } from "./Loading";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store";
import { setNotification } from "@/store/slices/notification";
import { NotificationParams } from "@/types/notifications";
import { setIsNotificationModalOpen } from "@/store/slices/layout";
import { Button, Spinner } from "@material-tailwind/react";
import { getNotificationType } from "../notification-modal/utils";

interface Props {
  toggle: () => void;
}

export const Notifications = ({ toggle }: Props) => {
  const [markNotificationAsRead, { isLoading: isMarkingNotification }] =
    useMarkNotificationsAsReadMutation();

  const { data, isFetching } = useGetNotificationsQuery();

  const session = useSession();

  const dispatch = useAppDispatch();

  const openNotification = async (item: NotificationParams) => {
    const isRead = checkIsRead(item.readBy);

    if (!isRead) {
      await markNotificationAsRead(item._id).unwrap();
    }

    toggle();
    dispatch(setNotification(item));
    dispatch(setIsNotificationModalOpen(true));
  };

  const userId = session.data?.user.id || "";

  const checkIsRead = (readBy: string[]) => readBy.includes(userId);

  if (isFetching) return <Loading />;

  return (
    <ul className={`mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto`}>
      {data?.map((item, index) => (
        <li key={index} role="menuitem">
          <Button
            onClick={() => {
              openNotification(item);
            }}
            className={`flex w-full items-center gap-4 rounded-lg px-2 py-1.5 !normal-case text-dark outline-none ${isMarkingNotification ? "cursor-wait bg-primary text-white opacity-70" : !checkIsRead(item.readBy) ? "bg-primary !font-extrabold text-white transition-opacity duration-500 hover:opacity-80 dark:bg-dark-2" : "transition-color bg-transparent font-medium duration-500 hover:bg-gray-2 focus-visible:bg-gray-2 dark:text-white dark:hover:bg-dark-3 dark:focus-visible:bg-dark-3"} `}
          >
            {isMarkingNotification ? (
              <Spinner className="h-5 w-5" />
            ) : item.type === "info" ? (
              <BellRing />
            ) : (
              <DownloadCloud />
            )}

            <div>
              <strong className="block text-sm">
                {getNotificationType(item.type)}
              </strong>

              <span
                className={`truncate text-sm ${checkIsRead(item.readBy) ? "font-medium text-dark-5 dark:text-dark-6" : "font-extrabold text-gray-300"}`}
              >
                {item.content}
              </span>
            </div>
          </Button>
        </li>
      ))}
      {data?.length && data.length > 5 && (
        <Link
          href="#"
          className="block rounded-lg border border-primary p-2 text-center text-sm font-medium tracking-wide text-primary outline-none transition-colors hover:bg-blue-light-5 focus:bg-blue-light-5 focus:text-primary focus-visible:border-primary dark:border-dark-3 dark:text-dark-6 dark:hover:border-dark-5 dark:hover:bg-dark-3 dark:hover:text-dark-7 dark:focus-visible:border-dark-5 dark:focus-visible:bg-dark-3 dark:focus-visible:text-dark-7"
        >
          See all notifications
        </Link>
      )}
    </ul>
  );
};
