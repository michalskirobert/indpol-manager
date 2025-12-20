import { Calendar } from "lucide-react";
import { GridColumn, GridFilter, UpdateFilterFunction } from "../types";
import { useEffect } from "react";
import flatpickr from "flatpickr";

interface DateProviderProps extends GridColumn {
  filter: GridFilter | undefined;
  updateFilter: UpdateFilterFunction;
}

export const DateProvider = ({
  field,
  filter,
  updateFilter,
}: DateProviderProps) => {
  useEffect(() => {
    flatpickr(".form-datepicker", {
      mode: filter?.operator === "between" ? "range" : "single",
      static: true,
      monthSelectorType: "static",
      allowInput: true,
      animate: true,
      dateFormat: "m.d.Y",
    });
  }, [filter?.operator]);

  return (
    <div className="relative w-full">
      <input
        className={`form-datepicker z-99999 h-5 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary`}
        placeholder="mm.dd.yyyy"
        data-class="flatpickr-right"
        value={String(filter?.value || "")}
        onChange={(e) => {
          if (filter?.operator === "between") {
            const dates = e.currentTarget.value
              .split(" to ")
              .map((d) => new Date(d));
            updateFilter({
              field,
              operator: filter.operator,
              value: dates[0],
              valueTo: dates[1],
            });
            return;
          }

          updateFilter({
            field,
            operator: filter?.operator || "equals",
            value: e.currentTarget.valueAsDate,
          });
        }}
      />

      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
        <Calendar className="size-5 text-[#9CA3AF]" />
      </div>
    </div>
  );
};
