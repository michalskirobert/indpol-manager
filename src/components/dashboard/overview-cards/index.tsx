"use client";

import { compactFormat } from "@/lib/format-number";

import { OverviewCard } from "./Card";
import { useGetStatsQuery } from "@/store/services/stats";
import OverviewCardsSkeleton from "./Skeleton";
import { Error } from "./Error";

import * as icons from "./Icons";

export default function OverviewCardsGroup() {
  const { data, isFetching, isError } = useGetStatsQuery();

  const { totalProducts, totalProfit, totalSales, totalUsers } = data || {};

  if (isError) return <Error />;

  if (isFetching) return <OverviewCardsSkeleton />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {totalSales && (
        <OverviewCard
          label="Total sales"
          data={{
            ...totalSales,
            value: compactFormat(totalSales.value),
          }}
          Icon={icons.Views}
        />
      )}
      {totalProfit && (
        <OverviewCard
          label="Total Profit"
          data={{
            ...totalProfit,
            value: "$" + compactFormat(totalProfit.value),
          }}
          Icon={icons.Profit}
        />
      )}
      {totalProducts && (
        <OverviewCard
          label="Total Products"
          data={{
            ...totalProducts,
            value: compactFormat(totalProducts.value),
          }}
          Icon={icons.Product}
        />
      )}
      {totalUsers && (
        <OverviewCard
          label="Total Users"
          data={{
            ...totalUsers,
            value: compactFormat(totalUsers.value),
          }}
          Icon={icons.Users}
        />
      )}
    </div>
  );
}
