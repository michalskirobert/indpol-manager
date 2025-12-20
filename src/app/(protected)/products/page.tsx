"use client";

import { ShowcaseSection } from "@/components/shared/Section";
import { Grid } from "@/components/shared/table";
import axios from "axios";

export default function ProductsPage() {
  return (
    <ShowcaseSection title="Products">
      <Grid
        columns={[
          {
            caption: "name",
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
        ]}
        selection={{ mode: "single", deferred: true }}
        keyExpr="id"
        toolbar={{
          items: [{ role: "refetch" }, { role: "clear" }],
        }}
        onDataLoad={{
          url: "api/products",
          onLoad: async (response) => response.data,
        }}
      />
    </ShowcaseSection>
  );
}
