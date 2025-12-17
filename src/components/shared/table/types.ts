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

export type GridProps<T extends Record<string, any>> = {
  columns: GridColumn[];
  dataSource: GridDataSource<T>;
  height?: number;
  width?: number | string;
  className?: string;
  selection?: {
    mode: "single" | "multiple";
    deferred: boolean;
  };
  selectionKeys?: Array<string | number>;
  keyExpr?: string;
  onLoadMore?: () => void;
  onSort?: (sorting: GridSorting | null) => void;
  onFilter?: (filters: GridFilter[]) => void;
  onSelectionChange?: (selectedKeys: Array<string | number>) => void;
};

export type UpdateFilterFunction = (filter: GridFilter) => void;
