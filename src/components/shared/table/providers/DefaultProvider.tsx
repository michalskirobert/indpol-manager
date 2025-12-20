import { useState } from "react";
import { GridColumn, UpdateFilterFunction, GridFilter } from "../types";

interface DefaultProviderProps extends GridColumn {
  filter: GridFilter | undefined;
  updateFilter: UpdateFilterFunction;
}

export const DefaultProvider = ({
  field,
  filter,
  type,
  updateFilter,
}: DefaultProviderProps) => {
  const [range, setRange] = useState<[number | undefined, number | undefined]>([
    filter?.value as number | undefined,
    filter?.valueTo as number | undefined,
  ]);

  if (filter?.operator === "between" && type === "number") {
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
              operator: filter.operator || "equals",
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
              operator: filter.operator || "equals",
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
      value={String(filter?.value || "")}
      onChange={(e) =>
        updateFilter({
          field,
          operator: filter?.operator || "equals",
          value: e.target.value,
        })
      }
    />
  );
};
