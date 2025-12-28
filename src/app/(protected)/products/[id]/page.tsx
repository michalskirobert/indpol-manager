import { ProductNotFound } from "@/components/product-form/NotFoundProduct";
import { ShowcaseSection } from "@/components/shared/Section";
import { getCollection } from "@/lib/mongodb";
import { ProductProps } from "@/types/products";
import { ObjectId } from "mongodb";
import dynamic from "next/dynamic";

const ProductForm = dynamic(() => import("@components/product-form"), {
  loading: () => <div>Loading...</div>,
});

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const collection = await getCollection("store", "products");

  const product = await collection.findOne<ProductProps>({
    _id: new ObjectId(params.id),
  });

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <ShowcaseSection title={product.fullname}>
      <ProductForm data={JSON.stringify(product)} />
    </ShowcaseSection>
  );
}
