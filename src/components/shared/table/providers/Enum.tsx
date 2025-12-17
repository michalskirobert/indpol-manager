import { GridColumn, GridFilterOperator, UpdateFilterFunction } from "../types";

interface EnumProviderProps extends GridColumn {
  filterOperator: GridFilterOperator;
  options: Array<{ label: string; value: string }>;
  updateFilter: UpdateFilterFunction;
}

export const EnumProvider = ({
  field,
  filterOperator,
  options,
  updateFilter,
}: EnumProviderProps) => (
  <select
    className="dx-input rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
    onChange={(e) =>
      updateFilter({
        field,
        operator: filterOperator,
        value: e.target.value === "" ? null : e.target.value === "true",
      })
    }
  >
    <option value="">All</option>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);
