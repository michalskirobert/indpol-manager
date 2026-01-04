import { Calendar, X } from "lucide-react";
import { GridColumn, GridFilter, UpdateFilterFunction } from "../types";
import { useEffect, useRef } from "react";
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
  const fpRef = useRef<flatpickr.Instance | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (selectedDates: Date[]) => {
    if (filter?.operator === "between") {
      updateFilter({
        field,
        value: selectedDates[0],
        valueTo: selectedDates[1],
      });
      return;
    }

    updateFilter({
      field,
      value: selectedDates[0],
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      fpRef.current = flatpickr(inputRef.current, {
        mode: filter?.operator === "between" ? "range" : "single",
        static: true,
        monthSelectorType: "static",
        allowInput: true,
        animate: true,
        dateFormat: "d.m.Y",
        onChange,
      });
    }
    return () => {
      fpRef.current?.destroy();
    };
  }, [filter?.operator]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className="form-datepicker z-99999 h-5 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-3 py-3 pr-8 text-xs font-normal outline-none transition placeholder:text-xs focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
        placeholder="dd.mm.yyyy"
        data-class="flatpickr-right"
      />
      {(filter?.value || filter?.valueTo) && (
        <button
          type="button"
          aria-label="Clear date"
          className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded p-0.5 hover:bg-gray-100 dark:hover:bg-dark-3"
          style={{ lineHeight: 0 }}
          onClick={() => {
            fpRef.current?.clear();
            updateFilter({ field, value: "", valueTo: "" });
          }}
          tabIndex={0}
        >
          <X className="size-3 text-[#9CA3AF]" />
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 left-auto right-1 flex items-center">
        <Calendar className="size-3 text-[#9CA3AF]" />
      </div>
    </div>
  );
};
