import { GridProps } from "../types";

interface Props<T extends Record<string, any>>
  extends Pick<GridProps<T>, "columns" | "selection"> {
  rows: T[];
  getKey: (row: T, index: number) => string | number;
  isSelected: (key: string | number) => boolean;
  toggleSelect: (key: string | number) => void;
}

export const GridBody = <T extends Record<string, any>>({
  rows,
  columns,
  getKey,
  isSelected,
  toggleSelect,
  selection,
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

  return (
    <tbody className="text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      {rows.map((row, rowIndex) => {
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
      })}
    </tbody>
  );
};
