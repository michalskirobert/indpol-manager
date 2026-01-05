import { ChevronUp, ChevronDown } from "lucide-react";
import { FilterOperators } from "./FilterOperators";
import {
  GridFilter,
  GridFilterOperator,
  GridProps,
  GridSorting,
  UpdateFilterFunction,
} from "../types";
import { Providers } from "../providers";

interface Props<T extends Record<string, any>>
  extends Pick<GridProps<T>, "columns" | "selection"> {
  filters: GridFilter[];
  sorting: GridSorting | null;
  allSelected: boolean;
  someSelected: boolean;
  operators: Record<string, GridFilterOperator> | undefined;
  toggleSort: (field: string) => void;
  updateFilter: UpdateFilterFunction;
  toggleSelectAll: () => void;
  updateOperators: (fieldName: string, operator: GridFilterOperator) => void;
}

export const GridHeader = <T extends Record<string, any>>({
  columns,
  sorting,
  filters,
  allSelected,
  someSelected,
  selection,
  operators,
  updateOperators,
  toggleSort,
  updateFilter,
  toggleSelectAll,
}: Props<T>) => {
  return (
    <thead className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 sticky top-0 z-10">
      <tr>
        {selection?.mode === "multiple" && (
          <th className="border-neutral-300 dark:border-neutral-700 w-[50px] min-w-[50px] max-w-[50px] border px-3 py-2">
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
              className="border-neutral-300 dark:border-neutral-700 select-none border bg-white px-3 py-2 dark:bg-dark"
              style={{
                width: col.width ?? 190,
                minWidth: col.width ?? 190,
                maxWidth: col.width ?? 190,
              }}
            >
              <div className="flex flex-col gap-1">
                <div
                  className="flex items-center justify-between"
                  onClick={() => col.allowSorting && toggleSort(col.field)}
                >
                  <span className="mb-1">{col.caption}</span>
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
                  <div className="flex gap-1">
                    <FilterOperators
                      field={col.field}
                      type={col.type}
                      filterOperators={col.filterOperators}
                      currentOperator={operators?.[col.field] || "equals"}
                      setOperator={(field, operator) =>
                        updateOperators(field, operator)
                      }
                    />

                    <Providers
                      {...col}
                      filter={filter}
                      type={col.type || "string"}
                      updateFilter={updateFilter}
                      options={col.filterDataSource || []}
                    />
                  </div>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
