import { GridColumn } from "@/components/shared/table/types";
import { ProductStatus } from "@/types/products";

export const status: Record<ProductStatus, string> = {
  [ProductStatus.Draft]: "Draft",
  [ProductStatus.Published]: "Published",
  [ProductStatus.Withdraw]: "Withdraw",
};

export const statusOptions: Record<"label" | "value", string>[] = [
  { label: "Draft", value: `${ProductStatus.Draft}` },
  { label: "Published", value: `${ProductStatus.Published}` },
  { label: "Withdraw", value: `${ProductStatus.Withdraw}` },
];

export const columns: GridColumn[] = [
  {
    caption: "Name",
    field: "name",
    allowFiltering: true,
    allowSorting: true,
    type: "string",
  },
  {
    caption: "Brand",
    field: "brandName",
    allowFiltering: true,
    allowSorting: true,
    type: "string",
  },
  {
    caption: "Category",
    field: "categoryName",
    allowFiltering: true,
    allowSorting: true,
    type: "string",
  },
  {
    caption: "Created at",
    field: "createdAt",
    type: "date",
    allowFiltering: true,
    allowSorting: true,
  },
  {
    caption: "Price",
    field: "price",
    type: "number",
    allowFiltering: true,
    allowSorting: true,
    cellRender: (value) => `${value} zł`,
  },
  {
    caption: "Stock limit",
    field: "stockLimit",
    type: "number",
    allowFiltering: true,
    allowSorting: true,
    cellRender: (value) => `${value} pieces`,
  },
  {
    caption: "Discount",
    field: "discount",
    type: "number",
    allowFiltering: true,
    allowSorting: true,
    cellRender: (value) => `${value}%`,
  },
  {
    caption: "Status",
    field: "status",
    type: "enum",
    allowFiltering: true,
    allowSorting: true,
    filterDataSource: statusOptions,
    cellRender: (value) => {
      return status[value as ProductStatus];
    },
  },
  {
    caption: "Updated at",
    field: "updatedAt",
    type: "number",
    allowFiltering: true,
    allowSorting: true,
  },
];
