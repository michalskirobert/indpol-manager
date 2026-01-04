import { CustomButton } from "@/components/shared/button/CustomButton";
import Grid from "@/components/shared/table";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { UseFormSetValue } from "react-hook-form";
import { ProductFormInput } from "../types";
import { columns } from "./utils";
import { useState } from "react";
import { ArrowLeft, Disc } from "lucide-react";

interface Props {
  open: boolean;
  setValue: UseFormSetValue<ProductFormInput>;
  handler: () => void;
}

export const ApplyVariantsModal = ({ open, setValue, handler }: Props) => {
  const [variants, setVariants] = useState<string[]>([]);

  return (
    <Dialog {...{ open, handler }}>
      <DialogHeader>Product's variants</DialogHeader>
      <DialogBody>
        <Grid
          {...{
            selection: { mode: "multiple", deferred: true },
            height: 500,
            keyExpr: "id",
            columns,
            onDataLoad: {
              url: "api/products",
              onLoad: async (response) => response.data,
            },
            onSelectionChange: (selectedRows) => {
              setVariants(selectedRows as string[]);
            },
          }}
        />
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <CustomButton icon={<ArrowLeft />} content="Back" onClick={handler} />
        <CustomButton
          color="green"
          icon={<Disc />}
          content="Save variants"
          onClick={() => setValue("variants", variants)}
        />
      </DialogFooter>
    </Dialog>
  );
};
