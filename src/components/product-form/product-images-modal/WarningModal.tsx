import { CustomButton } from "@/components/shared/button/CustomButton";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Trash, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onRemove: () => Promise<void>;
  onClose: () => void;
}

export const WarningModal = ({
  isOpen,
  isLoading,
  onRemove,
  onClose,
}: Props) => {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Remove image</DialogHeader>

      <DialogBody>
        This action will permanently delete the selected image from the storage
        and cannot be undone. Please confirm if you wish to proceed.
      </DialogBody>

      <DialogFooter className="gap-2">
        <CustomButton
          icon={<Trash />}
          color="red"
          content="Remove"
          onClick={onRemove}
          disabled={isLoading}
        />
        <CustomButton
          icon={<X />}
          content="Cancel"
          onClick={onClose}
          disabled={isLoading}
        />
      </DialogFooter>
    </Dialog>
  );
};
