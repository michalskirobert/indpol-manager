import { ButtonProps } from "@material-tailwind/react";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from "react";

export type GridColumnType = "string" | "number" | "boolean" | "date" | "enum";

export type GridFilterOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "lessThan"
  | "between";

export type BtnProps = Omit<ButtonProps, "children"> & {
  icon: ReactNode;
  label: string;
};

export type RenderComponentProps<T extends Record<string, any>> = {
  filters: GridFilter[];
  sorting: GridSorting | null;
  selectedKeysState: (string | number)[];
  isWarningModal: boolean;
  selectedData: T[];
  setSelectedData: Dispatch<SetStateAction<T[]>>;
  refetch: () => Promise<void>;
  clearFilters: () => void;
  deleteRow: () => void;
  toggleWarningModal: () => void;
};

export interface ItemProps<T extends Record<string, any>> {
  role: "refetch" | "clear" | "delete" | "custom";
  renderComponent?: (props: RenderComponentProps<T>) => JSX.Element;
}

export type GridFilter = {
  field: string;
  operator: GridFilterOperator;
  value:
    | string
    | number
    | boolean
    | Date
    | Date[]
    | number[]
    | undefined
    | null;
  valueTo?:
    | string
    | number
    | boolean
    | Date
    | Date[]
    | number[]
    | undefined
    | null;
};

export type GridSortDirection = "asc" | "desc";

export type GridSorting = {
  field: string;
  direction: GridSortDirection;
};

export type GridColumn = {
  field: string;
  caption: string;
  type?: GridColumnType;
  width?: number;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  filterOperators?: GridFilterOperator[];
  filterDataSource?: Array<{ label: string; value: string }>;
  cellRender?: (value: any, row: any) => JSX.Element | string;
  calculateValue?: (row: any) => any;
};

export type GridDataSource<T> = {
  items: T[];
  total: number;
};

export type Toolbar<T extends Record<string, any>> = {
  items:
    | Omit<ItemProps<T>, "RenderComponentProps">[]
    | Omit<ItemProps<T>, "RenderComponentProps">[][];
  className?: string;
};

export type GridProps<T extends Record<string, any>> = PropsWithChildren & {
  columns: GridColumn[];
  height?: number;
  width?: number | string;
  className?: string;
  selection?: {
    mode: "single" | "multiple";
    deferred: boolean;
  };
  selectionKeys?: Array<string | number>;
  keyExpr?: string;
  data?: T[];
  onDataLoad?: DataStore<T>;
  toolbar?: Toolbar<T>;
  onSort?: (sorting: GridSorting | null) => void;
  onFilter?: (filters: GridFilter[]) => void;
  onSelectionChange?: (selectedKeys: Array<string | number>) => void;
};

export type UpdateFilterFunction = (
  filter: Omit<GridFilter, "operator">,
) => void;

export type DataStore<T = any> = {
  url: string;
  defaultFilters?: GridFilter[];
  defaultSorting?: GridSorting;
  onLoad: (response: any) => Promise<{ items: T[]; totalCount?: number }>;
  onNextPage?: () => Promise<void>;
  onInsert?: (values: Partial<T>) => Promise<void>;
  onUpdate?: (key: string | number, values: Partial<T>) => Promise<void>;
  onDelete?: (key: string | number) => Promise<void>;
};
