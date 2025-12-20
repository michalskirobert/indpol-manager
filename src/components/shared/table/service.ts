import { useEffect, useRef, useState } from "react";
import { GridFilter, GridProps, GridSorting } from "./types";
import axios from "axios";

export const useTableService = <T extends Record<string, any>>({
  keyExpr,
  selectionKeys,
  selection,
  data,
  onSelectionChange,
  onDataLoad,
  onSort,
  onFilter,
}: GridProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingMoreRef = useRef(false);
  const filterDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const [dataSource, setDataSource] = useState<T[]>(data || []);
  const [sorting, setSorting] = useState<GridSorting | null>(null);
  const [filters, setFilters] = useState<GridFilter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (!el || !onDataLoad) return;

    const checkScroll = () => {
      if (isFetchingMoreRef.current || isLoading) return;

      const reachedBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 20;

      if (reachedBottom) {
        isFetchingMoreRef.current = true;
        onDataLoad.onNextPage?.();
      }
    };

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [onDataLoad, isLoading]);

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

  const updateFilter = (filterUpdate: GridFilter) => {
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
    }

    setFilters((prevFilters) => {
      const others = prevFilters.filter((f) => f.field !== filterUpdate.field);

      if (
        filterUpdate.value !== undefined &&
        filterUpdate.value !== null &&
        String(filterUpdate.value).trim() !== ""
      ) {
        others.push({ ...filterUpdate, value: filterUpdate.value });
      }

      return others;
    });
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
      if (selectionKeys === undefined) {
        setInternalSelectedKeys([]);
      }
      if (!selection?.deferred) {
        onSelectionChange?.([]);
      }
      return;
    }

    if (selectedKeysState.length === dataSource.length) {
      if (selectionKeys === undefined) {
        setInternalSelectedKeys([]);
      }
      if (!selection?.deferred) {
        onSelectionChange?.([]);
      }
    } else {
      const allKeys = dataSource.map((item, idx) => {
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
    dataSource.length > 0 && selectedKeysState.length === dataSource.length;
  const someSelected =
    selectedKeysState.length > 0 &&
    selectedKeysState.length < dataSource.length;

  const getData = async () => {
    if (!onDataLoad) return;

    try {
      setIsLoading(true);

      const { url, onLoad } = onDataLoad;
      const response = await axios.get(url, {
        params: {
          sort: sorting,
          filter: filters,
        },
      });

      const result = await onLoad(response);
      setDataSource(result.items);
      isFetchingMoreRef.current = false;
      setError(null);
    } catch (err) {
      console.error("Error loading data:", err);
      isFetchingMoreRef.current = false;
      setError("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  const insert = async (values: Partial<T>) => {
    if (!onDataLoad?.onInsert) return;
    await onDataLoad.onInsert(values);
    await getData();
  };

  const update = async (key: string | number, values: Partial<T>) => {
    if (!onDataLoad?.onUpdate) return;
    await onDataLoad.onUpdate(key, values);
    await getData();
  };

  const remove = async (key: string | number) => {
    if (!onDataLoad?.onDelete) return;
    await onDataLoad.onDelete(key);
    await getData();
  };

  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      getData();
      onFilter?.(filters);
      onSort?.(sorting);
    }, 600);

    return () => clearTimeout(timeout);
  }, [filters, sorting]);

  useEffect(() => {
    getData();
  }, []);

  return {
    allSelected,
    someSelected,
    containerRef,
    dataSource,
    filters,
    sorting,
    error,
    isLoading,
    insert,
    update,
    remove,
    toggleSelectAll,
    toggleSort,
    updateFilter,
    getKey,
    isSelected,
    toggleSelect,
  };
};
