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

export interface DatePickerProps
  extends React.TextareaHTMLAttributes<HTMLInputElement> {
  dateConfig?: Partial<BaseOptions>;
  name: string;
  control: Control<any>;
  placeholder?: string;
  label: string;
}

export interface MultipleCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
  options: Item[];
  axis?: "horizontal" | "vertical";
}

export interface SignleCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any>;
}

export interface InputTextareaProps extends TextareaProps {
  name: string;
  control: Control<any>;
}

export interface CustomInputProps extends InputProps {
  name: string;
  control: Control<any>;
}

export interface InputSelectProps
  extends Omit<SelectProps, "children" | "crossOrigin"> {
  control: Control<any>;
  name: string;
  options: Item[];
  multi?: boolean;
}

export interface InputRadioProps
  extends Omit<RadioProps, "children" | "crossOrigin"> {
  options: Item[];
  control: Control<any>;
  name: string;
  axis?: "horizontal" | "vertical";
}

export interface InputSwitchProps
  extends Omit<SwitchProps, "children" | "crossOrigin"> {
  control: Control<any>;
  name: string;
}

export type FieldProps<T extends FieldValues> = {
  size?: TColSizes;
  inputProps?: CustomInputProps;
  dateProps?: DatePickerProps;
  textareaProps?: InputTextareaProps;
  switchProps?: InputSwitchProps;
  multipleCheckboxProps?: MultipleCheckboxProps;
  singleCheckboxProps?: SignleCheckboxProps;
  inputSelectProps?: InputSelectProps;
  radioProps?: InputRadioProps;
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
