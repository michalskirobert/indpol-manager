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

import packageJSON from "../../../../../package.json";

interface Props {
  open: boolean;
  toggle: () => void;
}

export function Modal({ open, toggle }: Props) {
  const { notification } = useAppSelector(({ notifications }) => notifications);

  const updatingVersion = notification?.updateDetails?.version;

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
      <DialogBody>
        {updatingVersion && (
          <div className="mb-2 flex gap-2">
            <b className="font-extrabold">Version:</b>
            <b>{updatingVersion}</b>
          </div>
        )}
        {notification && <Details {...notification} />}
      </DialogBody>
      <DialogFooter>
        {updatingVersion ? (
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
              tooltip={
                updatingVersion >= packageJSON.version
                  ? "You are up to date"
                  : ""
              }
              disabled={packageJSON.version >= updatingVersion}
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
