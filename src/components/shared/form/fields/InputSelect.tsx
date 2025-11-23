"use client";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Option, Select } from "@material-tailwind/react";
import { InputSelectProps } from "../types";

export const InputSelect = ({
  control,
  name,
  options,
  multi,
  ...restProps
}: InputSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select {...restProps} {...field}>
          {options.map(({ label, value }) => (
            <Option key={value} value={`${value}`}>
              {label}
            </Option>
          ))}
        </Select>
      )}
    />
  );
};

export default InputSelect;
