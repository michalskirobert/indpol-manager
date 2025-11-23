import { Controller, FieldValues, useController } from "react-hook-form";
import { SignleCheckboxProps } from "../types";
import { Checkbox } from "@material-tailwind/react";

export function SingleCheckbox<T extends FieldValues>({
  name,
  control,
  ...restProps
}: SignleCheckboxProps<T>) {
  const { field } = useController({ control, name });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox crossOrigin="checkbox" {...restProps} {...field} />
      )}
    />
  );
}
