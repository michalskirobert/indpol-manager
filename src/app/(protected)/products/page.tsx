"use client";

import { ShowcaseSection } from "@/components/shared/Section";
import { Grid } from "@/components/shared/table";
import { columns } from "./utils";
import { useButtons } from "./use-buttons";

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
