import { FieldValues, Path, useController } from "react-hook-form";
import { InputTextareaProps } from "../types";
import { Textarea } from "@material-tailwind/react";
import { Feedback } from "../Feedback";

export const InputTextarea = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: InputTextareaProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name: name as Path<T>,
  });
  return (
    <div className="mb-2 flex w-full flex-col">
      <Textarea {...restProps} {...field} error={fieldState.invalid} />
      {fieldState.invalid && <Feedback msg={fieldState.error?.message} />}
    </div>
  );
};
