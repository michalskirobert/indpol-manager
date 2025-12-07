import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/CustomTable";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { OrderProps, PaymentStatus, OrderStatus } from "@/types/orders";
import { ProductProps } from "@/types/products";
import { Product } from "@/models/store/Product";
import { Order } from "@/models/store/Order";

export async function TopSellings({ className }: { className?: string }) {
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

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Top Sellings
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] !text-left">Product</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead className="!text-right">Revenues</TableHead>
            <TableHead className="!text-right">AOV</TableHead>
            <TableHead>Growth</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product, i) => {
            const aov = product.sold > 0 ? product.revenues / product.sold : 0;
            return (
              <TableRow
                className="text-center text-base font-medium text-dark dark:text-white"
                key={product._id.toString() + i}
              >
                <TableCell className="flex min-w-fit items-center gap-3 !text-left">
                  <Image
                    src={product.logo ?? "/default-product.png"}
                    className="size-8 rounded-full object-cover"
                    width={40}
                    height={40}
                    alt={`${product.fullname ?? "Product"} Logo`}
                    role="presentation"
                  />
                  <div>{product.fullname}</div>
                </TableCell>
                <TableCell>{compactFormat(product.sold)}</TableCell>
                <TableCell className="!text-right text-green-light-1">
                  ${standardFormat(product.revenues || 0)}
                </TableCell>
                <TableCell className="!text-right">
                  ${standardFormat(aov)}
                </TableCell>
                <TableCell
                  className={cn(
                    product.growth >= 0 ? "text-green-500" : "text-red-500",
                  )}
                >
                  {product.growth.toFixed(0)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
