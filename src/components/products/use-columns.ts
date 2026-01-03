import { ProductStatus } from "@/types/products";
import { GridColumn } from "../shared/table/types";
import { status, statusOptions } from "./utils";
import { useInit } from "@/app/InitProvider";
import { DictionaryTypes } from "@/types/dictionaries";
import { getDictionary } from "@/utils/get-dictionary";

export const useColumns = () => {
  const { dictionaries } = useInit();

  const brands = getDictionary("brands", dictionaries).map(
    ({ name, value }) => ({
      label: name.en,
      value,
    }),
  );

  const categories = getDictionary("categories", dictionaries).map(
    ({ name, value }) => ({ label: name.en, value }),
  );

  const columns: GridColumn[] = [
    {
      caption: "Name",
      field: "name",
      allowFiltering: true,
      allowSorting: true,
      type: "string",
    },
    {
      caption: "Brand",
      field: "brand",
      allowFiltering: true,
      allowSorting: true,
      type: "enum",
      filterDataSource: brands,
      filterOperators: ["equals", "notEquals"],
      cellRender: (value) =>
        brands.find((dic) => dic.value === value)?.label || "",
    },
    {
      caption: "Category",
      field: "category",
      allowFiltering: true,
      allowSorting: true,
      type: "enum",
      filterDataSource: categories,
      filterOperators: ["equals", "notEquals"],
      cellRender: (value) =>
        categories.find((dic) => dic.value === value)?.label || "",
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
      type: "date",
      allowFiltering: true,
      allowSorting: true,
    },
  ];

  return columns;
};
