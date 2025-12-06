export type TableData<T> = {
  items: T[];
  totalCount: number;
};

export type Filter = { value: string; columnName: string };
export type Sorting = { columnName: string; direction: "asc" | "desc" };

export interface QueryParams extends Record<string, string | number> {
  skip: number;
  take: number;
}
