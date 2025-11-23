import { useController } from "react-hook-form";
import { InputSwitchProps } from "../types";
import { Switch } from "@material-tailwind/react";

export function InputSwitch({ control, name, ...restProps }: InputSwitchProps) {
  const { field } = useController({ name, control });

  return <Switch crossOrigin="switch" {...restProps} {...field} />;
}
