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

export function applyFiltersAndSort(
  queryParams: URLSearchParams,
): FiltersAndSortResult {
  const filters: MongoFilters = {};
  const sort: MongoSort = {};

  const skip = Number(queryParams.get("skip") ?? 0);
  const take = Number(queryParams.get("take") ?? 20);

  interface FilterItem {
    field: string;
    operator: string;
    value: string;
  }

  const filterItems: FilterItem[] = [];

  const filterMap = new Map<string, Partial<FilterItem>>();

  queryParams.forEach((value, key) => {
    const match = key.match(/^filter\[(\d+)\]\[(field|operator|value)\]$/);
    if (!match) return;

    const index = match[1];
    const prop = match[2];

    let filter = filterMap.get(index);
    if (!filter) {
      filter = {};
      filterMap.set(index, filter);
    }
    (filter as any)[prop] = value;
  });

  filterMap.forEach((filter) => {
    if (filter.field && filter.operator && filter.value !== undefined) {
      filterItems.push({
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      });
    }
  });

  for (const { field, operator, value } of filterItems) {
    let parsedValue: string | number | boolean = value;
    if (value === "true") {
      parsedValue = true;
    } else if (value === "false") {
      parsedValue = false;
    } else {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        parsedValue = num;
      }
    }

    switch (operator) {
      case "eq":
        filters[field] = { $eq: parsedValue };
        break;
      case "ne":
        filters[field] = { $ne: parsedValue };
        break;
      case "gt":
        filters[field] = { $gt: parsedValue as number };
        break;
      case "lt":
        filters[field] = { $lt: parsedValue as number };
        break;
      case "gte":
        filters[field] = { $gte: parsedValue as number };
        break;
      case "lte":
        filters[field] = { $lte: parsedValue as number };
        break;
      case "regex":
        if (typeof parsedValue === "string") {
          filters[field] = { $regex: parsedValue, $options: "i" };
        }
        break;
      default:
        if (typeof parsedValue === "string") {
          filters[field] = { $regex: parsedValue, $options: "i" };
        } else {
          filters[field] = { $eq: parsedValue };
        }
    }
  }

  const sortParam = queryParams.get("sort");
  if (sortParam) {
    const [field, direction] = sortParam.split(":");
    if (field) {
      sort[field] = direction === "desc" ? -1 : 1;
    }
  }

  return { filters, sort, skip, take };
}
