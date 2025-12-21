import { FiltersAndSortResult, MongoFilters, MongoSort } from "./types";
import { OPERATOR_MAP } from "./utils";

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
    const prop = match[2] as keyof FilterItem;

    const existing = filterMap.get(index) ?? {};
    filterMap.set(index, {
      ...existing,
      [prop]: value,
    });
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
    if (value === "") continue;

    let parsedValue: string | number | boolean = value;

    if (value === "true") parsedValue = true;
    else if (value === "false") parsedValue = false;
    else if (!Number.isNaN(Number(value))) parsedValue = Number(value);

    const mapper = OPERATOR_MAP[operator];

    if (!mapper) {
      console.warn(`Unsupported filter operator: ${operator}`);
      continue;
    }

    filters[field] = mapper(parsedValue);
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
