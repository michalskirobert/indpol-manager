import { TrashIcon } from "@/assets/icons";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { useDeleteImageMutation } from "@/store/services/images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Server, X } from "lucide-react";
import { toast } from "react-toastify";
import { extractPublicId } from "./utils";

interface Props {
  isOpen: boolean;
  imageUrl: string | null;
  onRemove: (publicId: string) => void;
  onClose: () => void;
}

export const WarningModal = ({
  isOpen,
  imageUrl,
  onRemove,
  onClose,
}: Props) => {
  const [deleteImage, { isLoading }] = useDeleteImageMutation();

  const handleDeleteFromCloud = async () => {
    let publicId: string;

    if (!imageUrl) return;

    try {
      publicId = extractPublicId(imageUrl);
    } catch (error) {
      toast.error("Failed to identify image. Please try again.");
      return;
    }

    try {
      await deleteImage({ public_id: [publicId] }).unwrap();
      onRemove(imageUrl);
      toast.success("Image was successfully removed from the cloud.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove image from the cloud.",
      );
    } finally {
      onClose();
    }
  };

  const handleDeleteLocally = () => {
    if (!imageUrl) return;

    try {
      const publicId = extractPublicId(imageUrl);
      onRemove(publicId);
      toast.success("Image was successfully removed locally.");
      onClose();
    } catch {
      toast.error("Failed to identify image. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Remove image</DialogHeader>

      <DialogBody>
        This action will remove the selected image. Choose how you want to
        proceed.
      </DialogBody>

      <DialogFooter className="gap-2">
        <CustomButton
          icon={<Server />}
          color="red"
          content="Remove from cloud"
          onClick={handleDeleteFromCloud}
          disabled={isLoading}
        />

        <CustomButton
          icon={<TrashIcon />}
          color="orange"
          content="Remove locally"
          onClick={handleDeleteLocally}
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
