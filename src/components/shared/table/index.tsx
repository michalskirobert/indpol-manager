"use client";

import { cn } from "@/lib/utils";
import { GridProps } from "./types";
import { useTableService } from "./service";

import { GridHeader } from "./components/GridHeader";
import { GridBody } from "./components/GridBody";

export const Grid = <T extends Record<string, any>>(props: GridProps<T>) => {
  const { columns, height = 500, width = "100%", className } = props;

  const {
    allSelected,
    someSelected,
    containerRef,
    dataSource,
    filters,
    sorting,
    error,
    isLoading,
    toggleSelectAll,
    toggleSort,
    updateFilter,
    getKey,
    isSelected,
    toggleSelect,
  } = useTableService<T>(props);

  return (
    <div
      ref={containerRef}
      className={cn(
        "dark:bg-dark-1 relative overflow-auto rounded-md border",
        className,
      )}
      style={{ height, width }}
    >
      <table className="w-full border-collapse text-sm">
        <GridHeader
          {...{
            allSelected,
            someSelected,
            columns,
            selection: props.selection,
            filters,
            sorting,
            toggleSort,
            updateFilter,
            toggleSelectAll,
          }}
        />
        <GridBody
          {...{
            columns,
            rows: dataSource || [],
            getKey,
            isSelected,
            toggleSelect,
            selection: props.selection,
            error,
            isLoading,
          }}
        />
      </table>
    </div>
  );
};
