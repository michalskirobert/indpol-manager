import { Controller, FieldValues, Path } from "react-hook-form";
import { CustomInputProps } from "../types";
import { Input } from "@material-tailwind/react";
import { Feedback } from "../Feedback";

const CustomInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => (
        <div className="mb-2 flex w-full flex-col">
          <Input
            crossOrigin="input"
            {...restProps}
            {...field}
            error={fieldState.invalid}
          />
          <Feedback msg={fieldState.error?.message} />
        </div>
      )}
    />
  );
};

export default CustomInput;
