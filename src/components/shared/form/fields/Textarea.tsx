import { FieldValues, Path, useController } from "react-hook-form";
import { InputTextareaProps } from "../types";
import { Textarea } from "@material-tailwind/react";

export const InputTextarea = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: InputTextareaProps<T>) => {
  const { field } = useController({ control, name: name as Path<T> });
  return <Textarea {...restProps} {...field} />;
};
