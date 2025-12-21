import { escapeRegex } from "./helpers";
import { MongoFilters } from "./types";

export const OPERATOR_MAP: Record<
  string,
  (value: string | number | boolean) => MongoFilters[string]
> = {
  equals: (v) => ({ $eq: v }),
  notEquals: (v) => ({ $ne: v }),
  contains: (v) => ({ $regex: String(v), $options: "i" }),
  startsWith: (v) => ({
    $regex: `^${escapeRegex(String(v))}`,
    $options: "i",
  }),
  endsWith: (v) => ({
    $regex: `${escapeRegex(String(v))}$`,
    $options: "i",
  }),
  greaterThan: (v) => ({ $gt: Number(v) }),
  lessThan: (v) => ({ $lt: Number(v) }),
};
