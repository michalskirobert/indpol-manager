import { ChevronUp, ChevronDown } from "lucide-react";
import { FilterOperators } from "./FilterOperators";
import { GridFilter, GridProps, GridSorting } from "../types";
import { Providers } from "../providers";

interface Props<T extends Record<string, any>>
  extends Pick<GridProps<T>, "columns" | "selection"> {
  filters: GridFilter[];
  sorting: GridSorting | null;
  allSelected: boolean;
  someSelected: boolean;
  toggleSort: (field: string) => void;
  updateFilter: (props: GridFilter) => void;
  toggleSelectAll: () => void;
}

export const GridHeader = <T extends Record<string, any>>({
  columns,
  sorting,
  filters,
  allSelected,
  someSelected,
  selection,
  toggleSort,
  updateFilter,
  toggleSelectAll,
}: Props<T>) => {
  return (
    <thead className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 sticky top-0 z-10">
      <tr>
        {selection?.mode === "multiple" && (
          <th className="border-neutral-300 dark:border-neutral-700 border px-3 py-2">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) {
                  input.indeterminate = someSelected && !allSelected;
                }
              }}
              onChange={toggleSelectAll}
            />
          </th>
        )}

        {columns.map((col) => {
          const filter = filters.find((f) => f.field === col.field);
          const isSorted = sorting?.field === col.field;

          return (
            <th
              key={col.field}
              className={`width-[${col.width || 100}] border-neutral-300 dark:border-neutral-700 select-none border px-3 py-2`}
            >
              <div
                className="flex items-center justify-between"
                onClick={() => col.allowSorting && toggleSort(col.field)}
              >
                <span>{col.caption}</span>
                {col.allowSorting && (
                  <>
                    {isSorted && sorting.direction === "asc" && (
                      <ChevronUp size={14} />
                    )}
                    {isSorted && sorting.direction === "desc" && (
                      <ChevronDown size={14} />
                    )}
                  </>
                )}
              </div>

              {col.allowFiltering && (
                <div className="mt-1 flex gap-1">
                  <FilterOperators
                    field={col.field}
                    type={col.type}
                    filterOperators={col.filterOperators}
                    currentOperator={filter?.operator}
                    setOperator={(field, operator) =>
                      updateFilter({ field, operator, value: null })
                    }
                  />

                  <Providers
                    {...col}
                    type={col.type || "string"}
                    filterOperator={filter?.operator || "equals"}
                    updateFilter={updateFilter}
                    options={col.filterDataSource || []}
                  />
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
