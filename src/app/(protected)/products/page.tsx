import { ProductsListSkeleton } from "@/components/products/Skeleton";
import { ShowcaseSection } from "@/components/shared/Section";
import dynamic from "next/dynamic";

const List = dynamic(() => import("@/components/products"), {
  loading: () => <ProductsListSkeleton />,
});

export default function ProductsPage() {
  return (
    <ShowcaseSection title="Products">
      <List />
    </ShowcaseSection>
  );
}
