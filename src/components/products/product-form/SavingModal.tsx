import { ProductStatus } from "@/types/products";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { CustomButton } from "@shared/button/CustomButton";
import { ArrowLeft, Globe, PencilLine } from "lucide-react";
import { LoadingBlocker } from "@shared/LoadingBlocker";

interface Props {
  open: boolean;
  isLoading: boolean;
  onSave: (status: ProductStatus) => Promise<void>;
  handler: () => void;
}

export const SavingModal = ({ open, isLoading, onSave, handler }: Props) => (
  <Dialog {...{ open, handler }}>
    <LoadingBlocker isLoading={isLoading}>
      <DialogHeader>Confirm save</DialogHeader>
      <DialogBody>
        You are about to save this product. Please choose the status you want to
        apply.
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <CustomButton
          icon={<ArrowLeft />}
          content="Cancel changes"
          onClick={handler}
        />
        <div className="flex gap-2">
          <CustomButton
            icon={<Globe />}
            content="Publish product"
            onClick={() => onSave(ProductStatus.Published)}
            color="green"
          />
          <CustomButton
            icon={<PencilLine />}
            content="Save as draft"
            onClick={() => onSave(ProductStatus.Draft)}
            color="orange"
          />
        </div>
      </DialogFooter>
    </LoadingBlocker>
  </Dialog>
);
