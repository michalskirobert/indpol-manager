import { PaymentsOverview } from "@/components/shared/charts/payments-overview";
import { WeeksProfit } from "@/components/shared/charts/weeks-profit";
import { TopSales } from "@/components/dashboard/tables/top-sales";
import { TopSalesSkeleton } from "@/components/dashboard/tables/top-sales/Skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";

import OverViewCardsSkeleton from "@components/dashboard/overview-cards/Skeleton";
import dynamic from "next/dynamic";

const OverViewCard = dynamic(
  () => import("@components/dashboard/overview-cards"),
  { loading: OverViewCardsSkeleton },
);

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <OverViewCard />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />
        <Suspense fallback={null}>
          <WeeksProfit
            key={extractTimeFrame("weeks_profit")}
            timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
            className="col-span-12 xl:col-span-5"
          />
        </Suspense>
        <div className="col-span-12 grid xl:col-span-12">
          <Suspense fallback={<TopSalesSkeleton />}>
            <TopSales />
          </Suspense>
        </div>
      </div>
    </>
  );
}
