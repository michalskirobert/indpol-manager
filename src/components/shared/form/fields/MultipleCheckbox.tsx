import { FieldValues, useController } from "react-hook-form";
import { MultipleCheckboxProps } from "../types";
import { Checkbox } from "@material-tailwind/react";

export function MultipleCheckbox({
  name,
  control,
  label,
  options,
  axis,
  ...restProps
}: MultipleCheckboxProps) {
  const { field } = useController({ control, name });

  const parseChckedValue = (option: string): string => {
    const currentValue: string[] = (field.value || "").split(",");

    if (!field.value) return option;

    if (currentValue.includes(option)) {
      return currentValue
        .filter((optionEntry) => optionEntry !== option)
        .toString();
    }

    return [...currentValue, option].toString();
  };

  return (
    <div>
      <label>{label}</label>
      {options.map(({ label, value }) => (
        <Checkbox
          key={value}
          crossOrigin="checkbox"
          {...restProps}
          {...field}
          label={label}
          disabled={false}
          checked={field.value
            ?.split(",")
            ?.some((val: string) => val === value)}
          onChange={() => field.onChange(parseChckedValue(value))}
        />
      ))}
    </div>
  );
}
