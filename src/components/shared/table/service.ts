import { useEffect, useRef, useState } from "react";
import { GridFilter, GridProps, GridSorting } from "./types";

export const useTableService = <T extends Record<string, any>>({
  keyExpr,
  selectionKeys,
  dataSource,
  selection,
  onSelectionChange,
  onLoadMore,
  onSort,
  onFilter,
}: GridProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<GridSorting | null>(null);
  const [filters, setFilters] = useState<GridFilter[]>([]);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<
    Array<string | number>
  >(selectionKeys ?? []);

  const selectedKeysState = selectionKeys ?? internalSelectedKeys;

  useEffect(() => {
    if (selectionKeys !== undefined) {
      setInternalSelectedKeys(selectionKeys);
    }
  }, [selectionKeys]);

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

  const updateFilter = ({ field, operator, value, valueTo }: GridFilter) => {
    const others = filters.filter((f) => f.field !== field);
    const next: GridFilter = { field, operator, value, valueTo };
    const newFilters = [...others, next];
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const getKey = (row: T, index: number): string | number => {
    if (keyExpr && keyExpr in row) {
      return (row as any)[keyExpr];
    }
    return row?.id ?? index;
  };

  const isSelected = (key: string | number) => selectedKeysState.includes(key);

  const toggleSelect = (key: string | number) => {
    let newSelectedKeys: Array<string | number>;
    if (selection?.mode === "single") {
      if (isSelected(key)) {
        newSelectedKeys = [];
      } else {
        newSelectedKeys = [key];
      }
    } else {
      if (isSelected(key)) {
        newSelectedKeys = selectedKeysState.filter((k) => k !== key);
      } else {
        newSelectedKeys = [...selectedKeysState, key];
      }
    }
    if (selectionKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    if (!selection?.deferred) {
      onSelectionChange?.(newSelectedKeys);
    }
  };

  const toggleSelectAll = () => {
    if (selection?.mode === "single") {
      // For single selection mode, toggleSelectAll does nothing or clears selection
      if (selectionKeys === undefined) {
        setInternalSelectedKeys([]);
      }
      if (!selection?.deferred) {
        onSelectionChange?.([]);
      }
      return;
    }

    if (selectedKeysState.length === dataSource.items.length) {
      if (selectionKeys === undefined) {
        setInternalSelectedKeys([]);
      }
      if (!selection?.deferred) {
        onSelectionChange?.([]);
      }
    } else {
      const allKeys = dataSource.items.map((item, idx) => {
        if (keyExpr && keyExpr in item) {
          return (item as any)[keyExpr];
        }
        return idx;
      });
      if (selectionKeys === undefined) {
        setInternalSelectedKeys(allKeys);
      }
      if (!selection?.deferred) {
        onSelectionChange?.(allKeys);
      }
    }
  };

  const allSelected =
    dataSource.items.length > 0 &&
    selectedKeysState.length === dataSource.items.length;
  const someSelected =
    selectedKeysState.length > 0 &&
    selectedKeysState.length < dataSource.items.length;

  return {
    containerRef,
    allSelected,
    someSelected,
    sorting,
    filters,
    toggleSelectAll,
    toggleSort,
    updateFilter,
    getKey,
    isSelected,
    toggleSelect,
  };
};
