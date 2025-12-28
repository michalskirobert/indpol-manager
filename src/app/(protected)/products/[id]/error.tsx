"use client";

import { ShowcaseSection } from "@/components/shared/Section";

import Link from "next/link";

const ProductErrorPage = () => {
  return (
    <ShowcaseSection title="An error accured">
      <h3 className="text-lg font-bold">Possible reasons:</h3>
      <ol className="list-disc">
        <li>The Product ID is incorrect (must be a Guide).</li>
        <li>
          The server is temporarily unavailable. Please check the Product ID and
          try again later. Contact the administrator if the issue continues.
        </li>
      </ol>
      <Link href="/products" className="mt-5 text-blue-600 underline">
        Back to products list
      </Link>
    </ShowcaseSection>
  );
};

export default ProductErrorPage;
