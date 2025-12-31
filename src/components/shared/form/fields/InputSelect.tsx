"use client";
import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { Option, Select } from "@material-tailwind/react";
import { InputSelectProps } from "../types";
import { Feedback } from "../Feedback";

export const InputSelect = <T extends FieldValues>({
  control,
  name,
  options,
  multi,
  label,
  required,
  ...restProps
}: InputSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => (
        <div className="mb-2 flex w-full flex-col">
          <Select
            {...restProps}
            {...field}
            label={required ? `${label}*` : label}
            error={fieldState.invalid}
          >
            {options.map(({ label, value }) => (
              <Option key={value} value={`${value}`}>
                {label}
              </Option>
            ))}
          </Select>
          <Feedback msg={fieldState.error?.message} />
        </div>
      )}
    />
  );
};

export default InputSelect;
