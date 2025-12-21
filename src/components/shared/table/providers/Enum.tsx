import {
  GridColumn,
  GridFilter,
  GridFilterOperator,
  UpdateFilterFunction,
} from "../types";

interface EnumProviderProps extends GridColumn {
  filter: GridFilter | undefined;
  options: Array<{ label: string; value: string }>;
  updateFilter: UpdateFilterFunction;
}

export const EnumProvider = ({
  field,
  filter,
  options,
  updateFilter,
}: EnumProviderProps) => (
  <select
    className="dx-input dark:border-neutral-600 w-full rounded-sm border border-gray-300 px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none dark:bg-dark-2 dark:text-white dark:focus:border-primary"
    value={String(filter?.value || "")}
    onChange={(e) =>
      updateFilter({
        field,
        operator: filter?.operator || "equals",
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
