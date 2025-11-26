"use client";

import { NotificationParams } from "@/types/notifications";
import Link from "next/link";
import { ReactNode } from "react";

import { format } from "date-fns";
import { getJobPosition } from "@/utils/process-user-data";
import { useAppDispatch } from "@/store";
import { setIsNotificationModalOpen } from "@/store/slices/layout";

const InfoDetails = ({
  author: { fullname, jobPosition, id },
  content,
  createdAt,
}: NotificationParams) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div className="mt-5 text-xs">
        <p>
          Created at: {format(createdAt || new Date(), "dd.MM.yyyy, HH:mm")}
        </p>
        <div className="flex gap-1">
          <p>Author:</p>
          <Link
            className="font-bold"
            href={`/users/${id}`}
            onClick={() => dispatch(setIsNotificationModalOpen(false))}
          >
            {fullname} ({getJobPosition(jobPosition)})
          </Link>
        </div>
      </div>
    </div>
  );
};

const UpdateDetails = ({
  author: { fullname, jobPosition, id },
  content,
  createdAt,
}: NotificationParams) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div>
        Created at: {format(createdAt || new Date(), "dd.MM.YYYYY")}
        Author:
        <Link href={`/users/${id}`}>
          {fullname} {jobPosition}
        </Link>
      </div>
    </>
  );
};

export const Details = (props: NotificationParams) => {
  const source: Record<NotificationParams["type"], ReactNode> = {
    info: <InfoDetails {...props} />,
    update: <UpdateDetails {...props} />,
  };

  return source[props.type] || "Invalid notification type!";
};
