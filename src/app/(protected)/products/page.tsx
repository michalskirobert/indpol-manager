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
            type: "string",
            filterOperators: ["contains"],
          },
          {
            caption: "test",
            field: "test",
            allowFiltering: true,
            allowSorting: true,
            type: "string",
            filterOperators: ["contains"],
          },
          {
            caption: "test",
            field: "test",
            allowFiltering: true,
            allowSorting: true,
            type: "string",
            filterOperators: ["contains"],
          },
        ]}
        key={"id"}
        dataSource={{
          items: [
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
            { test: "true" },
          ],
          total: 1,
        }}
      />
    </ShowcaseSection>
  );
}
