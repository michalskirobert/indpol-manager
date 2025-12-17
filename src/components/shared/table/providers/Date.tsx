import { Calendar } from "lucide-react";
import { GridColumn, GridFilterOperator, UpdateFilterFunction } from "../types";
import { useEffect } from "react";
import flatpickr from "flatpickr";

interface DateProviderProps extends GridColumn {
  filterOperator: GridFilterOperator;
  updateFilter: UpdateFilterFunction;
}

export const DateProvider = ({
  field,
  filterOperator,
  updateFilter,
}: DateProviderProps) => {
  useEffect(() => {
    flatpickr(".form-datepicker", {
      mode: filterOperator === "between" ? "range" : "single",
      static: true,
      monthSelectorType: "static",
      allowInput: true,
      animate: true,
      dateFormat: "m.d.Y",
    });
  }, [filterOperator]);

  return (
    <div className="relative w-full">
      <input
        className={`form-datepicker z-99999 h-5 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary`}
        placeholder="mm.dd.yyyy"
        data-class="flatpickr-right"
        onChange={(e) => {
          if (filterOperator === "between") {
            const dates = e.currentTarget.value
              .split(" to ")
              .map((d) => new Date(d));
            updateFilter({
              field,
              operator: filterOperator,
              value: dates[0],
              valueTo: dates[1],
            });
            return;
          }

          updateFilter({
            field,
            operator: filterOperator,
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
