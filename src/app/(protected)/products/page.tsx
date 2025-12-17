"use client";

import { ShowcaseSection } from "@/components/shared/Section";
import { Grid } from "@/components/shared/table";

export default function ProductsPage() {
  return (
    <ShowcaseSection title="Products">
      <Grid
        columns={[
          {
            caption: "test",
            field: "test",
            allowFiltering: true,
            allowSorting: true,
            type: "number",
          },
          {
            caption: "test1",
            field: "test1",
            allowFiltering: true,
            allowSorting: true,
            type: "date",
          },
          {
            caption: "test2",
            field: "test2",
            allowFiltering: true,
            allowSorting: true,
            type: "boolean",
          },
        ]}
        selection={{ mode: "single", deferred: true }}
        keyExpr="id"
        dataSource={{
          items: [
            { id: 1, test: 1, test1: "2024-01-01", test2: false },
            { id: 2, test: 2, test1: "2024-01-02", test2: true },
            { id: 3, test: 3, test1: "2024-01-03", test2: false },
            { id: 4, test: 4, test1: "2024-01-04", test2: true },
          ],
          total: 4,
        }}
      />
    </ShowcaseSection>
  );
}
