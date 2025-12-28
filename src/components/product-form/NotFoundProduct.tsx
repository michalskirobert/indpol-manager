import { ShowcaseSection } from "../shared/Section";
import Link from "next/link";

export const ProductNotFound = () => {
  return (
    <ShowcaseSection title="An error accured">
      <h2>
        Product is not found
        <span className="ml-1 text-lg font-bold text-red-600">404</span>
      </h2>

      <Link href="/products" className="font-bold text-blue-500 underline">
        Back to the Products list
      </Link>
    </ShowcaseSection>
  );
};
