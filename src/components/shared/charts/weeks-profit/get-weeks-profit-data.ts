import { getStoreModels } from "@/models/dbModels";
import { OrderProps } from "@/types/orders";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function getWeeksProfitData(
  timeFrame?: "this week" | "last week",
) {
  const now = new Date();

  const { Order } = await getStoreModels();

  let start: Date;
  let end: Date;

  const day = now.getDay(); // 0=Sun, 6=Sat
  if (timeFrame === "last week") {
    start = new Date(now);
    start.setDate(now.getDate() - day - 7);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 7);
  } else {
    start = new Date(now);
    start.setDate(now.getDate() - day);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 7);
  }

  const orders = await Order.find({
    createdDate: { $gte: start, $lt: end },
    status: { $ne: 50 },
  }).lean<OrderProps[]>();

  const salesMap = new Map<string, number>();
  const revenueMap = new Map<string, number>();

  daysOfWeek.forEach((d) => {
    salesMap.set(d, 0);
    revenueMap.set(d, 0);
  });

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const dayName = daysOfWeek[date.getDay()];
    salesMap.set(
      dayName,
      (salesMap.get(dayName) || 0) + (order.items?.length || 0),
    );
    revenueMap.set(
      dayName,
      (revenueMap.get(dayName) || 0) + (order.totalAmount || 0),
    );
  });

  const sales = Array.from(salesMap.entries()).map(([x, y]) => ({ x, y }));
  const revenue = Array.from(revenueMap.entries()).map(([x, y]) => ({ x, y }));

  return { sales, revenue };
}
