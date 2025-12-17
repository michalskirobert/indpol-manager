import { GridColumn, GridFilterOperator, UpdateFilterFunction } from "../types";

interface BooleanProviderProps extends GridColumn {
  filterOperator: GridFilterOperator;
  updateFilter: UpdateFilterFunction;
}

export const BooleanProvider = ({
  field,
  type,
  filterOperator,
  updateFilter,
}: BooleanProviderProps) => (
  <select
    className="w-full rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
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
