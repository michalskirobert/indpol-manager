import { FieldValues, Path, useController } from "react-hook-form";
import { InputSwitchProps } from "../types";
import { Switch } from "@material-tailwind/react";

export function InputSwitch<T extends FieldValues>({
  control,
  name,
  ...restProps
}: InputSwitchProps<T>) {
  const { field } = useController({ name: name as Path<T>, control });

  return <Switch crossOrigin="switch" {...restProps} {...field} />;
}
