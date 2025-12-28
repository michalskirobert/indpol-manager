import { CustomButton } from "@/components/shared/button/CustomButton";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  image: string;
  isOpen: boolean;
  close: () => void;
}

export const ZoomImage = ({ image, isOpen, close }: Props) => (
  <Dialog open={isOpen} handler={() => null}>
    <DialogBody>
      <Image
        src={image}
        className="h-full w-full object-contain"
        height={1200}
        width={1200}
        alt="Zoom"
      />
    </DialogBody>
    <DialogFooter>
      <CustomButton content="Close" icon={<X />} onClick={close} />
    </DialogFooter>
  </Dialog>
);
