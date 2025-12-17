"use client";

import { cn } from "@/lib/utils";
import { GridProps } from "./types";
import { useTableService } from "./service";

import { GridHeader } from "./components/GridHeader";
import { GridBody } from "./components/GridBody";

export const Grid = <T extends Record<string, any>>(props: GridProps<T>) => {
  const {
    columns,
    dataSource,
    height = 500,
    width = "100%",
    className,
  } = props;

  const table = useTableService<T>(props);

  return (
    <div
      ref={table.containerRef}
      className={cn(
        "dark:bg-dark-1 relative overflow-auto rounded-md border",
        className,
      )}
      style={{ height, width }}
    >
      <table className="w-full border-collapse text-sm">
        <GridHeader
          {...{
            allSelected: table.allSelected,
            someSelected: table.someSelected,
            columns,
            selection: props.selection,
            filters: table.filters,
            sorting: table.sorting,
            toggleSort: table.toggleSort,
            updateFilter: table.updateFilter,
            toggleSelectAll: table.toggleSelectAll,
          }}
        />
        <GridBody
          {...{
            columns,
            rows: dataSource.items,
            getKey: table.getKey,
            isSelected: table.isSelected,
            toggleSelect: table.toggleSelect,
            selection: props.selection,
          }}
        />
      </table>
    </div>
  );
};
