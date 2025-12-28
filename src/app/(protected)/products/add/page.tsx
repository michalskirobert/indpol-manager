import { ShowcaseSection } from "@/components/shared/Section";
import dynamic from "next/dynamic";

const ProductForm = dynamic(() => import("@components/product-form"), {
  loading: () => <div>Loading...</div>,
});

export default function AddProductPage() {
  return (
    <ShowcaseSection title="Add new product">
      <ProductForm />
    </ShowcaseSection>
  );
}
