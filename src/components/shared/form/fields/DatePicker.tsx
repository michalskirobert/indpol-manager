"use client";

import flatpickr from "flatpickr";
import { Calendar } from "lucide-react";
import { useEffect } from "react";
import { DatePickerProps } from "../types";
import { Controller } from "react-hook-form";
import { Feedback } from "../Feedback";

export const DatePicker = ({
  control,
  name,
  label,
  dateConfig,
  ...fieldProps
}: DatePickerProps) => {
  useEffect(() => {
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      allowInput: true,
      animate: true,
      ...dateConfig,
      dateFormat: dateConfig?.dateFormat || "M j, Y",
    });
  }, [dateConfig]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="mb-2 flex w-full flex-col">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {label}
          </label>
          <div className="relative">
            <input
              className={`form-datepicker z-99999 w-full rounded-[7px] border-[1.5px] ${fieldState.invalid ? "border-red-400" : "border-stroke"} bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary`}
              placeholder="mm/dd/yyyy"
              data-class="flatpickr-right"
              {...fieldProps}
              {...field}
            />

            <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
              <Calendar className="size-5 text-[#9CA3AF]" />
            </div>
          </div>
          <Feedback msg={fieldState.error?.message} />
        </div>
      )}
    />
  );
};
