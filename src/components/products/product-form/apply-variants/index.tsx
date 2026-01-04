import { CustomButton } from "@/components/shared/button/CustomButton";
import Grid from "@/components/shared/table";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { ProductFormInput } from "../types";
import { columns } from "./utils";
import { useState } from "react";
import { ArrowLeft, Disc } from "lucide-react";
import { toast } from "react-toastify";

import _ from "lodash";

interface Props {
  open: boolean;
  id: string;
  control: Control<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  handler: () => void;
}

export const ApplyVariantsModal = ({
  open,
  control,
  id,
  setValue,
  handler,
}: Props) => {
  const selectedVariants = useWatch({ name: "variants", control });

  const [variants, setVariants] = useState<string[]>(selectedVariants || []);

  const onSave = () => {
    setValue("variants", variants, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    handler();

    toast.success("Selected variants are assigned!");
  };

  const isDirty = !_.isEqual(variants, selectedVariants);

  return (
    <Dialog {...{ open, handler }}>
      <DialogHeader>Product's variants</DialogHeader>
      <DialogBody>
        <Grid
          {...{
            selection: { mode: "multiple", deferred: false },
            height: 500,
            keyExpr: "id",
            columns,
            onDataLoad: {
              url: `api/products/${id}/variants`,
              onLoad: async (response) => response.data,
            },
            selectionKeys: variants,
            toolbar: { items: [{ role: "refetch" }, { role: "clear" }] },
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
          onClick={onSave}
          disabled={!isDirty}
          tooltip={!isDirty ? "No changes to save" : ""}
        />
      </DialogFooter>
    </Dialog>
  );
};
