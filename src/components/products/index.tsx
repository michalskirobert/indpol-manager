"use client";

import Grid from "@shared/table";

import { useButtons } from "./use-buttons";
import { useColumns } from "./use-columns";

const ProductsList = () => {
  const { buttons } = useButtons();
  const columns = useColumns();

  return (
    <Grid
      columns={columns}
      selection={{ mode: "single", deferred: true }}
      keyExpr="id"
      toolbar={{
        items: buttons,
      }}
      onDataLoad={{
        url: "api/products",
        onLoad: async (response) => response.data,
      }}
    />
  );
};

export default ProductsList;
