import { ReactNode } from "react";

export type FilterOperators =
  | "equal"
  | "notEqual"
  | "contains"
  | "from"
  | "up to"
  | "date";
export type ColumnTypes = "date" | "string" | "boolean" | "object";
export type Sorting = { columnName: string; desc: "desc" | "asc" };
export type Filter = {
  columnName: string;
  operator: FilterOperators;
  value: string;
};

export type ColumnProps = {
  name: string;
  caption: string;
  defaultSorting?: Sorting;
  defaultFilter?: Pick<Filter, "operator" | "value">;
  type?: ColumnTypes;
  filterOptions?: { label: string; value: string }[];
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  tooltip?: string;
  tooltipIcon?: ReactNode;
};

export type GridProps<T extends Record<string, string>> = {
  dataSource: { items: T[]; totalItems: number };
  columns: ColumnProps;
  height?: number;
  width?: number;
  className?: string;
  selections?: {
    mode: "single" | "multiple";
    showSelectAll: boolean;
  };
  allowFilters?: boolean;
  allowSortings?: boolean;
};
