"use client";

import { ProductFormSkeleton } from "@/components/products/product-form/Skeleton";
import { ShowcaseSection } from "@/components/shared/Section";

export default function LoadingProductFormPage() {
  return (
    <ShowcaseSection title="Loading...">
      <ProductFormSkeleton />
    </ShowcaseSection>
  );
}
