"use client";

import Grid from "@shared/table";

import { columns } from "./utils";
import { useButtons } from "./use-buttons";

const ProductsList = () => {
  const items = useButtons();

  return (
    <Grid
      columns={columns}
      selection={{ mode: "single", deferred: true }}
      keyExpr="_id"
      toolbar={{
        items,
      }}
      onDataLoad={{
        url: "api/products",
        onLoad: async (response) => response.data,
      }}
    />
  );
};

export default ProductsList;
