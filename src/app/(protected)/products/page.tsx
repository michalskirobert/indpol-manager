"use client";

import { ShowcaseSection } from "@/components/shared/Section";
import { columns } from "./utils";
import { useButtons } from "./use-buttons";

import Grid from "@shared/table";

export default function ProductsPage() {
  const items = useButtons();

  return (
    <ShowcaseSection title="Products">
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
    </ShowcaseSection>
  );
}
