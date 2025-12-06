export type StatsResponse = Record<
  "totalSales" | "totalProfit" | "totalProducts" | "totalUsers",
  { growthRate: number; value: number }
>;
