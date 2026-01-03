import { getInit } from "@/app/layout";
import { ProductNotFound } from "@components/products/product-form/NotFoundProduct";
import { ShowcaseSection } from "@components/shared/Section";
import { getCollection } from "@lib/mongodb";
import { DictionaryTypes } from "@/types/dictionaries";
import { ProductProps } from "@/types/products";
import { ObjectId } from "mongodb";
import dynamic from "next/dynamic";
import { findDictionaryName } from "./utils";
import { ProductFormSkeleton } from "@/components/products/product-form/Skeleton";

const ProductForm = dynamic(() => import("@components/products/product-form"), {
  loading: ProductFormSkeleton,
});

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const init = getInit();

  const collection = await getCollection("store", "products");

  const product = await collection.findOne<ProductProps>({
    _id: new ObjectId(params.id),
  });

  if (!product) {
    return <ProductNotFound />;
  }

  const foundBrand = findDictionaryName(
    init,
    DictionaryTypes.Brands,
    product.brand,
  );
  const foundCategory = findDictionaryName(
    init,
    DictionaryTypes.Categories,
    product.category,
  );

  return (
    <ShowcaseSection
      title={`${product.name} (${foundBrand}, ${foundCategory})`}
    >
      <ProductForm data={JSON.stringify(product)} />
    </ShowcaseSection>
  );
}
