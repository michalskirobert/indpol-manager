import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/dashboard/tables/InvoiceTable";
import { TopChannels } from "@/components/dashboard/tables/top-channels";
import { TopChannelsSkeleton } from "@/components/dashboard/tables/top-channels/Skeleton";
import { TopProducts } from "@/components/dashboard/tables/top-products";
import { TopProductsSkeleton } from "@/components/dashboard/tables/top-products/Skeleton";

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
