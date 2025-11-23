import { FieldValues, useController } from "react-hook-form";
import { InputTextareaProps } from "../types";
import { Textarea } from "@material-tailwind/react";

export function InputTextarea<T extends FieldValues>({
  name,
  control,
  ...restProps
}: InputTextareaProps<T>) {
  const { field } = useController({ control, name });
  return <Textarea {...restProps} {...field} />;
}
