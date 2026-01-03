import {
  GridColumn,
  GridColumnType,
  GridFilter,
  UpdateFilterFunction,
} from "../types";
import { BooleanProvider } from "./Boolean";
import { DateProvider } from "./Date";
import { DefaultProvider } from "./DefaultProvider";
import { EnumProvider } from "./Enum";

interface ProviderProps extends GridColumn {
  type: GridColumnType;
  options: Array<{ label: string; value: string }>;
  filter: GridFilter | undefined;
  updateFilter: UpdateFilterFunction;
}

export const Providers = (props: ProviderProps): JSX.Element => {
  console.log(props);
  const obj: Record<GridColumnType, JSX.Element> = {
    boolean: <BooleanProvider {...props} />,
    date: <DateProvider {...props} />,
    number: <DefaultProvider {...props} />,
    string: <DefaultProvider {...props} />,
    enum: <EnumProvider {...props} />,
  };

  return obj[props.type] || <DefaultProvider {...props} />;
};
