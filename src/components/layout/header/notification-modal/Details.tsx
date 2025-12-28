"use client";

import { NotificationParams } from "@/types/notifications";
import Link from "next/link";

import { format } from "date-fns";
import { getJobPosition } from "@/utils/process-user-data";
import { setIsNotificationModalOpen } from "@/store/reducers/layout";
import { Link2 } from "lucide-react";
import { useAppDispatch } from "@/store";

export const Details = ({
  author: { fullname, id, jobPosition },
  content,
  createdAt,
}: NotificationParams) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <div className="mt-5 flex flex-col gap-1">
        <p>
          <span className="mr-1 font-bold">Created at:</span>
          {format(createdAt || new Date(), "dd.MM.YYYYY, HH:mm")}
        </p>
        <div className="flex gap-1">
          <span className="font-bold">Author:</span>
          <Link
            className="inline-flex items-center gap-2 font-medium"
            href={`/users/${id}`}
            onClick={() => dispatch(setIsNotificationModalOpen(false))}
          >
            {fullname} ({getJobPosition(jobPosition)}) <Link2 />
          </Link>
        </div>
      </div>
    </>
  );
};
