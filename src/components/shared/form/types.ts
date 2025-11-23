import {
  CheckboxProps,
  InputProps,
  RadioProps,
  SelectProps,
  SwitchProps,
  TextareaProps,
} from "@material-tailwind/react";
import { BaseOptions } from "flatpickr/dist/types/options";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export type InputKind =
  | "input"
  | "multiple_checkbox"
  | "date"
  | "select"
  | "single_checkbox"
  | "input_radio"
  | "input_switch"
  | "textarea";

type TColSizes = {
  xs?: number;
  sm?: number;
  md?: number;
  lg: number;
  xl?: number;
};

export type Item = {
  label: string;
  value: string;
};

export interface DatePickerProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLInputElement> {
  dateConfig?: Partial<BaseOptions>;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label: string;
}

export interface MultipleCheckboxProps<T extends FieldValues>
  extends CheckboxProps {
  name: Path<T>;
  control: Control<T>;
  options: Item[];
  axis?: "horizontal" | "vertical";
}

export interface SignleCheckboxProps<T extends FieldValues>
  extends CheckboxProps {
  name: Path<T>;
  control: Control<T>;
}

export interface InputTextareaProps<T extends FieldValues>
  extends TextareaProps {
  name: Path<T>;
  control: Control<T>;
}

export interface CustomInputProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  control: Control<T>;
}

export interface InputSelectProps<T extends FieldValues>
  extends Omit<SelectProps, "children" | "crossOrigin"> {
  control: Control<T>;
  name: Path<T>;
  options: Item[];
  multi?: boolean;
}

export interface InputRadioProps<T extends FieldValues>
  extends Omit<RadioProps, "children" | "crossOrigin"> {
  options: Item[];
  control: Control<T>;
  name: Path<T>;
  axis?: "horizontal" | "vertical";
}

export interface InputSwitchProps<T extends FieldValues>
  extends Omit<SwitchProps, "children" | "crossOrigin"> {
  control: Control<T>;
  name: Path<T>;
}

export type FieldProps<T extends FieldValues> = {
  size?: TColSizes;
  inputProps?: CustomInputProps<T>;
  dateProps?: DatePickerProps<T>;
  textareaProps?: InputTextareaProps<T>;
  switchProps?: InputSwitchProps<T>;
  multipleCheckboxProps?: MultipleCheckboxProps<T>;
  singleCheckboxProps?: SignleCheckboxProps<T>;
  inputSelectProps?: InputSelectProps<T>;
  radioProps?: InputRadioProps<T>;
  classnames?: {
    colClassName?: string;
  };
  isHidden?: boolean;
  type: InputKind;
};

export type FormProps<T extends FieldValues> = {
  children: ReactNode;
  fields: FieldProps<T>[][];
};
