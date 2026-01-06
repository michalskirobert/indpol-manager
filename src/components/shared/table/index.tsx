"use client";

import { cn } from "@/lib/utils";
import { GridProps, ItemProps } from "./types";
import { useTableService } from "./service";

import { GridHeader } from "./components/GridHeader";
import { GridBody } from "./components/GridBody";
import { Toolbar } from "./components/toolbar/Toolbar";
import { Item } from "./components/toolbar/Item";
import { WarningModal } from "./components/WarningModal";

const Grid = <T extends Record<string, any>>(props: GridProps<T>) => {
  const {
    columns,
    height = 500,
    width = "100%",
    className,
    children,
    toolbar,
  } = props;

  const {
    allSelected,
    someSelected,
    containerRef,
    dataSource,
    filters,
    sorting,
    error,
    isLoading,
    selectedKeysState,
    operators,
    isWarningModal,
    isRemoving,
    isLoadingMore,
    selectedData,
    setSelectedData,
    remove,
    toggleWarningModal,
    updateOperators,
    getData,
    clearFilters,
    toggleSelectAll,
    toggleSort,
    updateFilter,
    getKey,
    isSelected,
    toggleSelect,
  } = useTableService<T>(props);

  return (
    <>
      {children}
      {!!toolbar?.items.length && (
        <Toolbar
          className={toolbar.className}
          hasGroup={Array.isArray(toolbar.items[0])}
        >
          {toolbar.items.map((groupOrItem, groupIndex) => {
            const renderToolbarItem = (itemProps: ItemProps<T>) => (
              <Item
                key={crypto.randomUUID()}
                {...itemProps}
                filters={filters}
                clearFilters={clearFilters}
                refetch={() => getData(true)}
                sorting={sorting}
                selectedKeysState={selectedKeysState}
                deleteRow={() => remove(selectedKeysState[0])}
                isWarningModal={isWarningModal}
                toggleWarningModal={toggleWarningModal}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            );

            return Array.isArray(groupOrItem) ? (
              <Toolbar key={groupIndex}>
                {groupOrItem.map(renderToolbarItem)}
              </Toolbar>
            ) : (
              renderToolbarItem(groupOrItem)
            );
          })}
        </Toolbar>
      )}
      <div
        ref={containerRef}
        className={cn(
          "dark:bg-dark-1 relative overflow-auto rounded-md border",
          className,
        )}
        style={{ height, width }}
      >
        <table className="w-full min-w-max border-collapse text-sm">
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
              updateOperators,
              operators,
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
              isLoadingMore,
            }}
          />
        </table>
      </div>
      {isWarningModal && (
        <WarningModal
          {...{
            isLoading: isRemoving,
            isOpen: isWarningModal,
            toggle: toggleWarningModal,
            remove: () => remove(selectedKeysState[0]),
          }}
        />
      )}
    </>
  );
};

export default Grid;
