import { Order, User, Product } from "@/models/store";
import { connectDB } from "@/types/mongodb";
import { OrderStatus, PaymentStatus } from "@/types/orders";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB("store");

  const now = new Date();
  const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endPrevMonth = startCurrentMonth;

  const currentSales = await Order.countDocuments({
    paymentStatus: PaymentStatus.Paid,
    status: { $ne: OrderStatus.Cancelled },
    createdAt: { $gte: startCurrentMonth },
  });

  console.log(currentSales);

  const previousSales = await Order.countDocuments({
    paymentStatus: PaymentStatus.Paid,
    status: { $ne: OrderStatus.Cancelled },
    createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
  });

  const totalSales = {
    value: currentSales,
    growthRate:
      previousSales > 0
        ? ((currentSales - previousSales) / previousSales) * 100
        : 0,
  };

  const currentProfitAgg = await Order.aggregate([
    {
      $match: {
        paymentStatus: PaymentStatus.Paid,
        status: { $ne: OrderStatus.Cancelled },
        createdAt: { $gte: startCurrentMonth },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const previousProfitAgg = await Order.aggregate([
    {
      $match: {
        paymentStatus: PaymentStatus.Paid,
        status: { $ne: OrderStatus.Cancelled },
        createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
      },
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const totalProfit = {
    value: currentProfitAgg[0]?.total || 0,
    growthRate:
      (previousProfitAgg[0]?.total || 0) > 0
        ? (((currentProfitAgg[0]?.total || 0) -
            (previousProfitAgg[0]?.total || 0)) /
            (previousProfitAgg[0]?.total || 0)) *
          100
        : 0,
  };

  const currentProducts = await Product.countDocuments({
    createdAt: { $gte: startCurrentMonth },
  });
  const previousProducts = await Product.countDocuments({
    createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
  });
  const totalProducts = {
    value: await Product.countDocuments(),
    growthRate:
      previousProducts > 0
        ? ((currentProducts - previousProducts) / previousProducts) * 100
        : 0,
  };

  const currentUsers = await User.countDocuments({
    createdAt: { $gte: startCurrentMonth },
  });
  const previousUsers = await User.countDocuments({
    createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
  });
  const totalUsers = {
    value: await User.countDocuments(),
    growthRate:
      previousUsers > 0
        ? ((currentUsers - previousUsers) / previousUsers) * 100
        : 0,
  };

  return NextResponse.json(
    {
      totalSales,
      totalProfit,
      totalProducts,
      totalUsers,
    },
    { status: 200 },
  );
};
