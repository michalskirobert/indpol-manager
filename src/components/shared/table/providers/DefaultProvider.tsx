import { useState } from "react";
import {
  GridColumn,
  GridFilterOperator,
  UpdateFilterFunction,
  GridFilter,
} from "../types";

interface DefaultProviderProps extends GridColumn {
  filterOperator: GridFilterOperator;
  currentFilter?: GridFilter;
  updateFilter: UpdateFilterFunction;
}

export const DefaultProvider = ({
  field,
  filterOperator,
  type,
  updateFilter,
  currentFilter,
}: DefaultProviderProps) => {
  const [range, setRange] = useState<[number | undefined, number | undefined]>([
    currentFilter?.value as number | undefined,
    currentFilter?.valueTo as number | undefined,
  ]);

  if (filterOperator === "between" && type === "number") {
    return (
      <div className="flex gap-1">
        <input
          className="dx-input dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 w-full rounded-sm border border-gray-300 px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none dark:focus:border-blue-400"
          placeholder="From"
          type="number"
          value={range[0] ?? ""}
          onChange={(e) => {
            const nextFrom = e.target.valueAsNumber || undefined;
            const nextRange: [number | undefined, number | undefined] = [
              nextFrom,
              range[1],
            ];
            setRange(nextRange);
            updateFilter({
              field,
              operator: filterOperator,
              value: nextRange[0],
              valueTo: nextRange[1],
            });
          }}
        />
        <input
          className="dx-input dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 w-full rounded-sm border border-gray-300 px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none dark:focus:border-blue-400"
          placeholder="To"
          type="number"
          value={range[1] ?? ""}
          onChange={(e) => {
            const nextTo = e.target.valueAsNumber || undefined;
            const nextRange: [number | undefined, number | undefined] = [
              range[0],
              nextTo,
            ];
            setRange(nextRange);
            updateFilter({
              field,
              operator: filterOperator,
              value: nextRange[0],
              valueTo: nextRange[1],
            });
          }}
        />
      </div>
    );
  }

  return (
    <input
      className="dx-input dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 w-full rounded-sm border border-gray-300 px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none dark:focus:border-blue-400"
      placeholder="Value"
      type={type}
      onChange={(e) =>
        updateFilter({ field, operator: filterOperator, value: e.target.value })
      }
    />
  );
};
