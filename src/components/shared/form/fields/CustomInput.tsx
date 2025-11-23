import { Controller, FieldValues } from "react-hook-form";
import { CustomInputProps } from "../types";
import { Input } from "@material-tailwind/react";

const CustomInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input crossOrigin="input" {...restProps} {...field} />
      )}
    />
  );
};

export default CustomInput;
