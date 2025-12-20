import { Alert, Spinner } from "@material-tailwind/react";
import { GridProps } from "../types";
import { is } from "zod/v4/locales";

interface Props<T extends Record<string, any>>
  extends Pick<GridProps<T>, "columns" | "selection"> {
  rows: T[];
  error: string | null;
  isLoading: boolean;
  getKey: (row: T, index: number) => string | number;
  isSelected: (key: string | number) => boolean;
  toggleSelect: (key: string | number) => void;
}

export const GridBody = <T extends Record<string, any>>({
  rows,
  columns,
  selection,
  error,
  isLoading,
  getKey,
  isSelected,
  toggleSelect,
}: Props<T>) => {
  const formatValue = (value: any, type?: string) => {
    if (value == null) return "";

    if (type === "date") {
      const date = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${mm}.${dd}.${yyyy}`;
    }

    if (type === "boolean") {
      return value ? (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
          YES
        </span>
      ) : (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
          NO
        </span>
      );
    }

    return String(value);
  };

  if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <tr key={`skeleton-${rowIndex}`}>
            {selection?.mode === "multiple" && (
              <td className="border-neutral-300 dark:border-neutral-700 border px-3 py-2">
                <div className="dark:bg-neutral-700 h-4 w-4 animate-pulse rounded bg-gray-200" />
              </td>
            )}
            {columns.map((_, colIndex) => (
              <td
                key={`skeleton-${rowIndex}-${colIndex}`}
                className="border-neutral-300 dark:border-neutral-700 border px-3 py-2"
              >
                <div className="dark:bg-neutral-700 h-4 w-full animate-pulse rounded bg-gray-300" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <tbody className="text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 relative">
      {error ? (
        <Alert color="red" className="absolute w-full">
          <span className="inline text-center">{error}</span>
        </Alert>
      ) : !isLoading && !error && rows.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length + (selection?.mode === "multiple" ? 1 : 0)}
          >
            <div className="flex h-96 w-full flex-col items-center justify-center text-gray-500">
              <h3 className="text-xl font-bold">No data</h3>
            </div>
          </td>
        </tr>
      ) : (
        rows.map((row, rowIndex) => {
          const key = getKey(row, rowIndex);

          return (
            <tr
              key={key}
              className={`border-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800 cursor-pointer border-b hover:bg-blue-50 ${isSelected(key) ? "bg-blue-100 dark:bg-blue-900 dark:text-white" : ""}`}
              onClick={() => selection && toggleSelect(key)}
            >
              {selection?.mode === "multiple" && (
                <td className="border-neutral-300 dark:border-neutral-700 border px-3 py-2">
                  <input
                    type="checkbox"
                    checked={isSelected(key)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleSelect(key)}
                  />
                </td>
              )}

              {columns.map((col) => (
                <td
                  key={col.field}
                  className="border-neutral-300 dark:border-neutral-700 border px-3 py-2"
                >
                  {col.cellRender
                    ? col.cellRender(
                        col.calculateValue
                          ? col.calculateValue(row)
                          : row[col.field],
                        row,
                      )
                    : formatValue(
                        col.calculateValue
                          ? col.calculateValue(row)
                          : row[col.field],
                        col.type,
                      )}
                </td>
              ))}
            </tr>
          );
        })
      )}
    </tbody>
  );
};
