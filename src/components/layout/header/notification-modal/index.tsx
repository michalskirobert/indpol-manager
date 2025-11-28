"use client";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Details } from "./Details";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { ArrowLeft, Check, Download } from "lucide-react";
import { useAppSelector } from "@/store";
import { getNotificationType } from "./utils";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  toggle: () => void;
}

export function Modal({ open, toggle }: Props) {
  const { notification } = useAppSelector(({ notification }) => notification);

  const downloadUpdate = () => {
    if (window === undefined || !notification?.updateDetails?.url) {
      toast.error("Update cannot be downloaded, contact with Administrator");
      return;
    }

    window.open(notification.updateDetails?.url, "_blank");
  };

  return (
    <Dialog open={open} handler={toggle}>
      <DialogHeader>{getNotificationType(notification?.type)}</DialogHeader>
      <DialogBody>{notification && <Details {...notification} />}</DialogBody>
      <DialogFooter>
        {notification?.updateDetails?.url ? (
          <div className="flex gap-2">
            <CustomButton
              color="black"
              icon={<ArrowLeft />}
              content="Close"
              onClick={toggle}
              type="button"
            />
            <CustomButton
              color="orange"
              icon={<Download />}
              content="Download"
              type="button"
              onClick={downloadUpdate}
            />
          </div>
        ) : (
          <CustomButton
            color="green"
            icon={<Check />}
            content="Ok"
            onClick={toggle}
            type="button"
          />
        )}
      </DialogFooter>
    </Dialog>
  );
}
