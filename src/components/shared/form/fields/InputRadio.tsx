import { InputRadioProps } from "../types";
import { FieldValues, useController } from "react-hook-form";
import { Radio } from "@material-tailwind/react";

export function InputRadio({
  control,
  name,
  options,
  label,
  ...restProps
}: InputRadioProps) {
  const { field } = useController({ name, control });

  return (
    <div className="flex gap-2">
      {options.map(({ label, value }) => (
        <Radio
          key={value}
          crossOrigin="radio"
          {...restProps}
          {...field}
          label={label}
          checked={value === field.value}
          onChange={() => field.onChange(value)}
        />
      ))}
    </div>
  );
}
