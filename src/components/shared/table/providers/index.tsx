import {
  GridColumn,
  GridColumnType,
  GridFilterOperator,
  UpdateFilterFunction,
} from "../types";
import { BooleanProvider } from "./Boolean";
import { DateProvider } from "./Date";
import { DefaultProvider } from "./DefaultProvider";

interface ProviderProps extends GridColumn {
  type: GridColumnType;
  filterOperator: GridFilterOperator;
  options: Array<{ label: string; value: string }>;
  updateFilter: UpdateFilterFunction;
}

export const Providers = (props: ProviderProps): JSX.Element => {
  const obj: Record<GridColumnType, JSX.Element> = {
    boolean: <BooleanProvider {...props} />,
    date: <DateProvider {...props} />,
    number: <DefaultProvider {...props} />,
    string: <DefaultProvider {...props} />,
    enum: <DefaultProvider {...props} />,
  };

  return obj[props.type] || <DefaultProvider {...props} />;
};
