import { useEffect, useRef, useState } from "react";
import {
  GridFilter,
  GridFilterOperator,
  GridProps,
  GridSorting,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import { TableData } from "@/types/table";

export const useTableService = <T extends Record<string, any>>({
  keyExpr,
  selectionKeys,
  selection,
  data,
  onDataLoad,
  onSelectionChange,
  onSort,
  onFilter,
}: GridProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetchingMoreRef = useRef(false);

  const filterDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isWarningModal, setIsWarningModal] = useState(false);

  const [isRemoving, setIsRemoving] = useState(false);

  const [dataSource, setDataSource] = useState<T[]>(data || []);
  const [sorting, setSorting] = useState<GridSorting | null>(null);
  const [filters, setFilters] = useState<GridFilter[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [take] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [operators, setOperators] =
    useState<Record<string, GridFilterOperator>>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<
    Array<string | number>
  >(selectionKeys ?? []);
  const skipRef = useRef(skip);

  const selectedKeysState = selectionKeys ?? internalSelectedKeys;

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

  const toggleWarningModal = () => setIsWarningModal((prev) => !prev);

  const updateFilter = (
    filterUpdate: Omit<GridFilter, "operator">,
    operator?: GridFilterOperator,
  ) => {
    if (filterDebounceRef.current) {
      clearTimeout(filterDebounceRef.current);
    }

    setFilters((prevFilters) => {
      const isEmpty =
        filterUpdate.value === undefined ||
        filterUpdate.value === null ||
        (typeof filterUpdate.value === "string" &&
          filterUpdate.value.trim() === "");

      const existing = prevFilters.find((f) => f.field === filterUpdate.field);

      if (isEmpty) {
        return prevFilters.filter((f) => f.field !== filterUpdate.field);
      }

      if (!existing) {
        return [
          ...prevFilters,
          {
            field: filterUpdate.field,
            operator: operator ?? operators?.[filterUpdate.field] ?? "equals",
            value: filterUpdate.value,
          },
        ];
      }

      return prevFilters.map((f) =>
        f.field === filterUpdate.field
          ? {
              ...f,
              value: filterUpdate.value,
              operator:
                operator ?? operators?.[filterUpdate.field] ?? f.operator,
            }
          : f,
      );
    });
  };

  const updateOperators = (fieldName: string, operator: GridFilterOperator) => {
    setOperators((prev) => ({ ...prev, [fieldName]: operator }));
    const foundFilter = filters.find(({ field }) => field === fieldName);

    if (foundFilter) updateFilter(foundFilter, operator);
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
    dataSource?.length > 0 && selectedKeysState.length === dataSource.length;
  const someSelected =
    selectedKeysState.length > 0 &&
    selectedKeysState.length < dataSource?.length;

  const getData = async (reset = false) => {
    if (!onDataLoad) return;

    try {
      if (reset) setIsLoading(true);
      else setIsLoadingMore(true);

      const { url, onLoad } = onDataLoad;
      console.log(url);
      const currentSkip = reset ? 0 : skipRef.current;
      const response = await axios.get<TableData<T>>(url, {
        params: {
          sort: sorting,
          filter: filters,
          skip: currentSkip,
          take,
        },
      });

      setTotalCount(response.data.totalCount);

      const result = await onLoad(response);
      setDataSource((prev) =>
        reset ? result.items : [...prev, ...result.items],
      );
      isFetchingMoreRef.current = false;
      setError(null);

      const resultItemsLength = result.items?.length || 0;

      const newSkip = reset
        ? resultItemsLength
        : skipRef.current + resultItemsLength;
      skipRef.current = newSkip;
      setSkip(newSkip);

      if (
        (reset ? resultItemsLength : dataSource?.length + resultItemsLength) >=
        response.data.totalCount
      ) {
        isFetchingMoreRef.current = true;
      }
    } catch (err) {
      console.error("Error loading data:", err);
      isFetchingMoreRef.current = false;
      setError("Failed to load data.");
    } finally {
      if (reset) setIsLoading(false);
      else setIsLoadingMore(false);
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
    if (!onDataLoad?.url) {
      setDataSource((prev) => prev.filter((props) => props[keyExpr!] !== key));
      toggleWarningModal();
      toast.success("Record has been removed");
      return;
    }

    if (onDataLoad.onDelete) {
      await onDataLoad.onDelete(key);
    }

    try {
      setIsRemoving(true);
      await axios.delete(`${onDataLoad.url}/${key}`);
      await getData();
      setInternalSelectedKeys([]);

      toggleWarningModal();
      toast.success("Record has been removed");
    } catch (error) {
      if (error instanceof Error)
        toast.success(
          `Record cannot be removed. Error details: ${error.message || "API not response"}`,
        );
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters([]);
    setSorting(null);

    onFilter?.([]);
    onSort?.(null);
    setOperators(undefined);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, [filters, sorting]);

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

      if (
        reachedBottom &&
        dataSource.length < (totalCount ?? Number.MAX_SAFE_INTEGER)
      ) {
        isFetchingMoreRef.current = true;
        getData(false);
      }
    };

    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [onDataLoad, isLoading, dataSource?.length]);

  return {
    allSelected,
    someSelected,
    containerRef,
    dataSource,
    filters,
    sorting,
    error,
    isLoading,
    isLoadingMore,
    selectedKeysState,
    operators,
    isWarningModal,
    isRemoving,
    toggleWarningModal,
    updateOperators,
    clearFilters,
    getData,
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
