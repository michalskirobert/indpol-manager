import { ButtonProps } from "@material-tailwind/react";
import { ReactNode } from "react";
import { CustomButton } from "./CustomButton";

export interface CustomButtonProps
  extends Pick<
    ButtonProps,
    | "variant"
    | "className"
    | "color"
    | "onClick"
    | "title"
    | "type"
    | "disabled"
    | "style"
  > {
  isLoading?: boolean;
  icon?: ReactNode;
  content?: string;
  tooltip?: string;
}

interface Props {
  type: "button";
  buttonProps?: CustomButtonProps;
}

export const Button = ({ type, buttonProps }: Props) => {
  switch (type) {
    case "button":
      return <CustomButton {...buttonProps!} />;
  }
};
