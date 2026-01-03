import { ProductFormSkeleton } from "@/components/products/product-form/Skeleton";
import { ShowcaseSection } from "@/components/shared/Section";
import dynamic from "next/dynamic";

const ProductForm = dynamic(() => import("@components/products/product-form"), {
  loading: ProductFormSkeleton,
});

export default function AddProductPage() {
  return (
    <ShowcaseSection title="Add new product">
      <ProductForm />
    </ShowcaseSection>
  );
}
