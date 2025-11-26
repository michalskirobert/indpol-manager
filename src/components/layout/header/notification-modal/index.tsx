"use client";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Details } from "./Details";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { Check } from "lucide-react";
import { useAppSelector } from "@/store";
import { getNotificationType } from "./utils";

interface Props {
  open: boolean;
  toggle: () => void;
}

export function Modal({ open, toggle }: Props) {
  const details = useAppSelector(({ notification }) => notification);

  return (
    <Dialog open={open} handler={toggle}>
      <DialogHeader>{getNotificationType(details.type)}</DialogHeader>
      <DialogBody>
        <Details {...details} />
      </DialogBody>
      <DialogFooter>
        <CustomButton
          color="green"
          icon={<Check />}
          content="Ok"
          onClick={toggle}
          type="button"
        />
      </DialogFooter>
    </Dialog>
  );
}
