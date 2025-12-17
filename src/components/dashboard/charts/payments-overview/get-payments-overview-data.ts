import { getCollection } from "@/lib/mongodb";
import { OrderProps, OrderStatus, PaymentStatus } from "@/types/orders";

export async function getPaymentsOverviewData(timeFrame: string) {
  const db = await getCollection<OrderProps>("store", "orders");

  const now = new Date();

  let start: Date;
  let end: Date;

  if (timeFrame === "monthly") {
    start = new Date(now.getFullYear(), 0, 1);
    end = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    start = new Date(2020, 0, 1);
    end = new Date(now.getFullYear() + 1, 0, 1);
  }

  const orders = await db
    .find({
      purchaseDate: { $gte: start, $lt: end },
      status: { $ne: OrderStatus.Cancelled },
    })
    .toArray();

  const receivedMap = new Map<string, number>();
  const dueMap = new Map<string, number>();

  orders.forEach((order) => {
    if (!order.purchaseDate) return;
    const date = new Date(order.purchaseDate);
    const key =
      timeFrame === "monthly"
        ? date.toLocaleString("default", { month: "short" })
        : date.getFullYear().toString();

    if (order.paymentStatus === PaymentStatus.Paid) {
      receivedMap.set(
        key,
        (receivedMap.get(key) || 0) + (order.totalAmount || 0),
      );
    } else {
      dueMap.set(key, (dueMap.get(key) || 0) + (order.totalAmount || 0));
    }
  });

  const received = Array.from(receivedMap.entries()).map(([x, y]) => ({
    x,
    y,
  }));
  const due = Array.from(dueMap.entries()).map(([x, y]) => ({ x, y }));

  return { received, due };
}
