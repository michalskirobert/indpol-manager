"use client";

import { useMemo } from "react";
import { GridColumn, GridColumnType, GridFilterOperator } from "../types";

const DEFAULT_OPERATORS: GridFilterOperator[] = ["equals"];

const OPERATORS_BY_TYPE: Partial<Record<GridColumnType, GridFilterOperator[]>> =
  {
    string: ["equals", "notEquals", "contains", "startsWith", "endsWith"],
    number: ["equals", "notEquals", "greaterThan", "lessThan", "between"],
    boolean: ["equals"],
    date: ["equals", "notEquals", "greaterThan", "lessThan", "between"],
    enum: ["equals", "notEquals"],
  };

const OPERATOR_LABELS: Record<GridFilterOperator, string> = {
  equals: "Equals",
  notEquals: "Not equals",
  contains: "Contains",
  startsWith: "Starts with",
  endsWith: "Ends with",
  greaterThan: "Greater than",
  lessThan: "Less than",
  between: "Between",
};

interface FilterOperatorsProps
  extends Pick<GridColumn, "type" | "field" | "filterOperators"> {
  currentOperator?: GridFilterOperator;
  setOperator: (columnName: string, operator: GridFilterOperator) => void;
}

export const FilterOperators = ({
  field,
  currentOperator,
  type,
  filterOperators,
  setOperator,
}: FilterOperatorsProps) => {
  const operators = useMemo((): GridFilterOperator[] => {
    if (filterOperators && filterOperators.length > 0) {
      return [...filterOperators];
    }

    if (!type) return [];

    return OPERATORS_BY_TYPE[type] || DEFAULT_OPERATORS;
  }, [type, filterOperators]);

  return (
    <select
      value={currentOperator}
      onChange={(e) => setOperator(field, e.target.value as GridFilterOperator)}
      className="dx-input rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
    >
      {operators.map((operator) => (
        <option key={operator} value={operator}>
          {OPERATOR_LABELS[operator] ?? operator}
        </option>
      ))}
    </select>
  );
};
