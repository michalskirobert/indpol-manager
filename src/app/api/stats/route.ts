import { getCollection } from "@/lib/mongodb";
import { OrderProps, OrderStatus, PaymentStatus } from "@/types/orders";
import { ProductProps } from "@/types/products";
import { StoreUser } from "@/types/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const orderDb = await getCollection<OrderProps>("store", "orders");
    const productDb = await getCollection<ProductProps>("store", "products");
    const userDb = await getCollection<StoreUser>("store", "users");

    const now = new Date();
    const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endPrevMonth = startCurrentMonth;

    const currentSales = await orderDb.countDocuments({
      paymentStatus: PaymentStatus.Paid,
      status: { $ne: OrderStatus.Cancelled },
    });

    const previousSales = await orderDb.countDocuments({
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

    const currentProfitAgg = await orderDb
      .aggregate([
        {
          $match: {
            paymentStatus: PaymentStatus.Paid,
            status: { $ne: OrderStatus.Cancelled },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ])
      .toArray();
    const previousProfitAgg = await orderDb
      .aggregate([
        {
          $match: {
            paymentStatus: PaymentStatus.Paid,
            status: { $ne: OrderStatus.Cancelled },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ])
      .toArray();

    const currentProfitTotal = currentProfitAgg[0]?.total || 0;
    const previousProfitTotal = previousProfitAgg[0]?.total || 0;

    const totalProfit = {
      value: currentProfitTotal,
      growthRate:
        previousProfitTotal > 0
          ? ((currentProfitTotal - previousProfitTotal) / previousProfitTotal) *
            100
          : 0,
    };

    const currentProducts = await productDb.countDocuments({
      createdAt: { $gte: startCurrentMonth },
    });
    const previousProducts = await productDb.countDocuments({
      createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
    });
    const totalProducts = {
      value: await productDb.countDocuments(),
      growthRate:
        previousProducts > 0
          ? ((currentProducts - previousProducts) / previousProducts) * 100
          : 0,
    };

    const currentUsers = await userDb.countDocuments({
      createdAt: { $gte: startCurrentMonth },
    });
    const previousUsers = await userDb.countDocuments({
      createdAt: { $gte: startPrevMonth, $lt: endPrevMonth },
    });

    const totalUsers = {
      value: await userDb.countDocuments(),
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
  } catch (err) {
    return NextResponse.json(
      { message: `Server is not respond. Details: ${err}` },
      { status: 500 },
    );
  }
};
