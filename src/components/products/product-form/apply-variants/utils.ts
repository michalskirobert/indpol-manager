import { GridColumn } from "@/components/shared/table/types";

export const columns: GridColumn[] = [
  {
    caption: "Name",
    field: "name",
    allowFiltering: true,
    allowSorting: true,
    type: "string",
  },
  {
    caption: "Created at",
    field: "createdAt",
    allowFiltering: true,
    allowSorting: true,
    type: "date",
  },
  {
    caption: "Updated at",
    field: "updatedAt",
    allowFiltering: true,
    allowSorting: true,
    type: "date",
  },
];
