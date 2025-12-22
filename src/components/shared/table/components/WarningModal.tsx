import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { CustomButton } from "../../button/CustomButton";
import { Check, CircleX, Cross } from "lucide-react";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  remove: () => Promise<void>;
  toggle: () => void;
}

export const WarningModal = ({ isOpen, isLoading, remove, toggle }: Props) => {
  return (
    <Dialog open={isOpen} handler={toggle}>
      <DialogHeader>Attention!</DialogHeader>
      <DialogBody>
        Deleting this item is permanent and cannot be undone. Do you want to
        proceed?
      </DialogBody>
      <DialogFooter className="flex items-center gap-2">
        <CustomButton
          color="green"
          icon={<Check />}
          content="Yes"
          onClick={remove}
          type="button"
          isLoading={isLoading}
        />
        <CustomButton
          color="red"
          icon={<CircleX />}
          content="No"
          onClick={toggle}
          type="button"
          disabled={isLoading}
        />
      </DialogFooter>
    </Dialog>
  );
};
