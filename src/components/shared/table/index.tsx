"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type GridColumnType = "string" | "number" | "boolean" | "date";

export type GridFilterOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "lessThan"
  | "between";

export type GridFilter = {
  field: string;
  operator: GridFilterOperator;
  value: string | number | boolean | null;
  valueTo?: string | number | boolean | null;
};

export type GridSortDirection = "asc" | "desc";

export type GridSorting = {
  field: string;
  direction: GridSortDirection;
};

export type GridColumn = {
  field: string;
  caption: string;
  type?: GridColumnType;
  width?: number;
  allowSorting?: boolean;
  allowFiltering?: boolean;
  filterOperators?: GridFilterOperator[];
  filterDataSource?: { label: string; value: any }[];
  cellRender?: (value: any, row: any) => JSX.Element | string;
  calculateValue?: (row: any) => any;
};

export type GridDataSource<T> = {
  items: T[];
  total: number;
};

export type GridProps<T extends Record<string, any>> = {
  columns: GridColumn[];
  dataSource: GridDataSource<T>;
  height?: number;
  width?: number | string;
  className?: string;
  onLoadMore?: () => void;
  onSort?: (sorting: GridSorting | null) => void;
  onFilter?: (filters: GridFilter[]) => void;
};

export const Grid = <T extends Record<string, any>>({
  columns,
  dataSource,
  height = 500,
  width = "100%",
  className,
  onLoadMore,
  onSort,
  onFilter,
}: GridProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<GridSorting | null>(null);
  const [filters, setFilters] = useState<GridFilter[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !onLoadMore) return;

    const checkScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        onLoadMore();
      }
    };

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [onLoadMore]);

  const toggleSort = (field: string) => {
    let next: GridSorting | null = null;

    if (!sorting || sorting.field !== field) {
      next = { field, direction: "asc" };
    } else if (sorting.direction === "asc") {
      next = { field, direction: "desc" };
    } else {
      next = null;
    }

    setSorting(next);
    onSort?.(next);
  };

  const updateFilter = (
    field: string,
    operator: GridFilterOperator,
    value: string | number | boolean | null,
    valueTo?: string | number | boolean | null,
  ) => {
    const others = filters.filter((f) => f.field !== field);
    const next: GridFilter = { field, operator, value, valueTo };
    const newFilters = [...others, next];
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "dark:bg-dark-1 relative overflow-auto rounded-md border bg-white",
        className,
      )}
      style={{ height, width }}
    >
      <table className="w-full border-collapse text-sm">
        <thead className="bg-neutral-200 dark:bg-neutral-800 sticky top-0 z-10">
          <tr>
            {columns.map((col) => {
              const isSorted = sorting?.field === col.field;
              return (
                <th
                  key={col.field}
                  className="cursor-pointer select-none border px-3 py-2"
                  style={{ width: col.width }}
                  onClick={() => col.allowSorting && toggleSort(col.field)}
                >
                  <div className="flex items-center justify-between">
                    <span>{col.caption}</span>
                    {col.allowSorting && (
                      <span>
                        {isSorted && sorting?.direction === "asc" && (
                          <ChevronUp size={14} />
                        )}
                        {isSorted && sorting?.direction === "desc" && (
                          <ChevronDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                  {col.allowFiltering && (
                    <div className="mt-1 flex gap-1">
                      {col.filterDataSource && (
                        <select
                          className="dx-input rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
                          onChange={(e) =>
                            updateFilter(
                              col.field,
                              "equals",
                              e.target.value === "" ? null : e.target.value,
                            )
                          }
                        >
                          <option value="">All</option>
                          {col.filterDataSource.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {col.type === "boolean" && !col.filterDataSource && (
                        <select
                          className="dx-input rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
                          onChange={(e) =>
                            updateFilter(
                              col.field,
                              "equals",
                              e.target.value === ""
                                ? null
                                : e.target.value === "true",
                            )
                          }
                        >
                          <option value="">All</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      )}

                      {!col.filterDataSource && col.type !== "boolean" && (
                        <>
                          <select
                            className="dx-input rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
                            onChange={(e) =>
                              updateFilter(
                                col.field,
                                e.target.value as GridFilterOperator,
                                "",
                              )
                            }
                          >
                            {(
                              col.filterOperators ?? [
                                "equals",
                                "contains",
                                "greaterThan",
                                "lessThan",
                                "between",
                              ]
                            ).map((op) => (
                              <option key={op} value={op}>
                                {op}
                              </option>
                            ))}
                          </select>

                          <input
                            className="dx-input w-full rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
                            placeholder="Value"
                            onChange={(e) =>
                              updateFilter(
                                col.field,
                                filters.find((f) => f.field === col.field)
                                  ?.operator ?? "equals",
                                e.target.value,
                              )
                            }
                          />

                          {filters.find((f) => f.field === col.field)
                            ?.operator === "between" && (
                            <input
                              className="dx-input w-full rounded-sm border border-gray-300 bg-white px-1.5 py-1 text-xs shadow-inner focus:border-blue-500 focus:outline-none"
                              placeholder="To"
                              onChange={(e) => {
                                const existing =
                                  filters.find((f) => f.field === col.field)
                                    ?.operator ?? "between";
                                updateFilter(
                                  col.field,
                                  existing,
                                  "",
                                  e.target.value,
                                );
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.items.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="dark:hover:bg-neutral-700 border-b hover:bg-blue-50"
            >
              {columns.map((col) => (
                <td key={col.field} className="border px-3 py-2">
                  {col.cellRender
                    ? col.cellRender(
                        col.calculateValue
                          ? col.calculateValue(row)
                          : row[col.field],
                        row,
                      )
                    : String(
                        col.calculateValue
                          ? col.calculateValue(row)
                          : (row[col.field] ?? ""),
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
