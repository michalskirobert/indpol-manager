import { Control, useController, useFieldArray } from "react-hook-form";

import { DetailItem } from "./items";
import { Plus } from "lucide-react";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { ProductFormInput } from "../types";
import { Feedback } from "@/components/shared/form/Feedback";

interface DetailProps {
  control: Control<ProductFormInput>;
}

const Details = ({ control }: DetailProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const { fieldState } = useController({ name: "details", control });

  const addNewDetail = () => {
    append({
      detail: { en: "", id: "", pl: "" },
      title: { en: "", id: "", pl: "" },
      id: crypto.randomUUID(),
    });
  };

  return (
    <div
      className={`flex w-full flex-col ${fieldState.invalid ? "border border-red-500" : ""}`}
    >
      {fields.map((field, index) => (
        <DetailItem key={field.id} {...{ index, control, remove }} />
      ))}
      <div className="mt-2 flex w-full justify-center">
        <CustomButton icon={<Plus />} onClick={addNewDetail} />
      </div>
      {fieldState.invalid && <Feedback msg={fieldState.error?.message} />}
    </div>
  );
};

export default Details;
