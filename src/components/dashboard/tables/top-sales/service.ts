import { OrderProps, PaymentStatus, OrderStatus } from "@/types/orders";
import { ProductProps } from "@/types/products";
import { getStoreModels } from "@/models/dbModels";

export const getTopSales = async () => {
  const { Product, Order } = await getStoreModels();

  const products = await Product.find().lean<ProductProps[]>();

  const now = new Date();
  const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endPrevMonth = startCurrentMonth;

  const currentOrders = await Order.find({
    paymentStatus: PaymentStatus.Paid,
    status: { $ne: OrderStatus.Cancelled },
    $expr: {
      $and: [{ $gte: [{ $toDate: "$createdDate" }, startCurrentMonth] }],
    },
  }).lean<OrderProps[]>();

  const previousOrders = await Order.find({
    paymentStatus: PaymentStatus.Paid,
    status: { $ne: OrderStatus.Cancelled },
    $expr: {
      $and: [
        { $gte: [{ $toDate: "$createdDate" }, startPrevMonth] },
        { $lt: [{ $toDate: "$createdDate" }, endPrevMonth] },
      ],
    },
  }).lean<OrderProps[]>();

  const soldCurrent = new Map<string, number>();
  const soldPrevious = new Map<string, number>();
  const revenueMap = new Map<string, number>();

  currentOrders.forEach((o) => {
    o.items?.forEach((item) => {
      if (!item?.productId) return;

      soldCurrent.set(
        item.productId,
        (soldCurrent.get(item.productId) || 0) + item.quantity,
      );
      const revenue = (item.price || 0) * item.quantity - (item.discount || 0);
      revenueMap.set(
        item.productId,
        (revenueMap.get(item.productId) || 0) + revenue,
      );
    });
  });

  previousOrders.forEach((o) => {
    o.items?.forEach((item) => {
      if (!item?.productId) return;

      soldPrevious.set(
        item.productId,
        (soldPrevious.get(item.productId) || 0) + item.quantity,
      );
    });
  });

  const data = products
    .map((p) => {
      const soldCur = soldCurrent.get(p._id.toString()) || 0;
      const soldPrev = soldPrevious.get(p._id.toString()) || 0;
      const growth =
        soldPrev > 0
          ? ((soldCur - soldPrev) / soldPrev) * 100
          : soldCur > 0
            ? 100
            : 0;

      return {
        ...p,
        sold: soldCur,
        revenues: revenueMap.get(p._id.toString()) || 0,
        growth,
        logo: p.images?.[0] || "/default-product.png",
      };
    })
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);

  return { data };
};
