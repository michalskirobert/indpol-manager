import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/CustomTable";
import { compactFormat, setCurrencyValue } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getTopSales } from "./service";

export async function TopSales({ className }: { className?: string }) {
  const { data } = await getTopSales();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Top Sales
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
                  {setCurrencyValue(product.revenues || 0)}
                </TableCell>
                <TableCell className="!text-right">
                  {setCurrencyValue(aov)}
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
