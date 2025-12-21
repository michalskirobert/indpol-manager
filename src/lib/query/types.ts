export type SortDirection = 1 | -1;

export type MongoSort = Record<string, SortDirection>;

export type MongoFilters = Record<
  string,
  | string
  | number
  | boolean
  | { $regex: string; $options: "i" }
  | { $eq: string | number | boolean }
  | {
      $gt?: number;
      $lt?: number;
      $gte?: number;
      $lte?: number;
      $ne?: string | number | boolean;
    }
>;

export interface FiltersAndSortResult {
  filters: MongoFilters;
  sort: MongoSort;
  skip: number;
  take: number;
}
