import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/tables/InvoiceTable";
import { TopChannels } from "@/components/tables/top-channels";
import { TopChannelsSkeleton } from "@/components/tables/top-channels/Skeleton";
import { TopProducts } from "@/components/tables/top-products";
import { TopProductsSkeleton } from "@/components/tables/top-products/Skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="space-y-10">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>

        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>

        <InvoiceTable />
      </div>
    </>
  );
};

export default TablesPage;
