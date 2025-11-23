import { Controller, FieldValues } from "react-hook-form";
import { CustomInputProps } from "../types";
import { Alert, Input } from "@material-tailwind/react";
import { Feedback } from "../Feedback";

const CustomInput = ({ name, control, ...restProps }: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
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
