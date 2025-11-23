import { useController } from "react-hook-form";
import { InputTextareaProps } from "../types";
import { Textarea } from "@material-tailwind/react";

export function InputTextarea({
  name,
  control,
  ...restProps
}: InputTextareaProps) {
  const { field } = useController({ control, name });
  return <Textarea {...restProps} {...field} />;
}
