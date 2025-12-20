import { GridColumn, GridFilterOperator, UpdateFilterFunction } from "../types";

interface BooleanProviderProps extends GridColumn {
  filterOperator: GridFilterOperator;
  updateFilter: UpdateFilterFunction;
}

export const BooleanProvider = ({
  field,
  filterOperator,
  updateFilter,
}: BooleanProviderProps) => (
  <select
    className="dark:border-neutral-600 w-full rounded-sm border border-gray-300 px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none dark:bg-dark-2 dark:text-white dark:focus:border-primary"
    onChange={(e) =>
      updateFilter({
        field,
        operator: filterOperator,
        value: e.target.value === "" ? null : e.target.value === "true",
      })
    }
  >
    <option value="">All</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
);
