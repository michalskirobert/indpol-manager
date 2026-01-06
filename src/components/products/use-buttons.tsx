"use client";

import { CustomButton } from "@/components/shared/button/CustomButton";
import { ItemProps } from "@/components/shared/table/types";
import { useModalManager } from "@/hooks/use-modals-manager";
import {
  ArrowUpDown,
  Pencil,
  Plus,
  Settings,
  SquarePercent,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatusModal } from "./status-modal";
import { ProductList } from "./types";
import { StockModal } from "./stock-modal";
import { DiscountModal } from "./discount-modal";

export const useButtons = () => {
  const router = useRouter();

  const { modals, toggle } = useModalManager("status", "stock", "discount");

  const buttons: ItemProps<ProductList>[][] = [
    [
      {
        role: "custom",
        renderComponent: () => (
          <CustomButton
            content="Add"
            color="green"
            icon={<Plus />}
            className="roundend-md h-10"
            onClick={() => router.push("/products/add")}
          />
        ),
      },
      {
        role: "custom",
        renderComponent: (props) => (
          <CustomButton
            content="Edit"
            color="orange"
            icon={<Pencil />}
            className="roundend-md h-10"
            disabled={!props.selectedKeysState[0]}
            tooltip={!props.selectedKeysState[0] ? "Select row" : ""}
            onClick={() =>
              router.push(`/products/${props.selectedKeysState[0]}`)
            }
          />
        ),
      },
      { role: "delete" },
      { role: "refetch" },
      { role: "clear" },
    ],
    [
      {
        role: "custom",
        renderComponent: ({ selectedData, refetch, setSelectedData }) => (
          <>
            <CustomButton
              content="Status"
              color="indigo"
              icon={<Settings />}
              className="roundend-md h-10"
              onClick={() => toggle("status")}
              disabled={!selectedData[0]}
              tooltip={!selectedData[0] ? "Select row" : ""}
            />
            {selectedData[0] && (
              <StatusModal
                {...{
                  open: modals.status,
                  product: selectedData[0],
                  refetch,
                  setSelectedData,
                  handler: () => toggle("status"),
                }}
              />
            )}
          </>
        ),
      },
      {
        role: "custom",
        renderComponent: ({ selectedData, refetch, setSelectedData }) => (
          <>
            <CustomButton
              content="Stocks limit"
              color="purple"
              icon={<ArrowUpDown />}
              className="roundend-md h-10"
              onClick={() => toggle("stock")}
              disabled={!selectedData[0]}
              tooltip={!selectedData[0] ? "Select row" : ""}
            />
            {selectedData[0] && (
              <StockModal
                {...{
                  open: modals.stock,
                  product: selectedData[0],
                  refetch,
                  setSelectedData,
                  handler: () => toggle("stock"),
                }}
              />
            )}
          </>
        ),
      },
      {
        role: "custom",
        renderComponent: ({ selectedData, refetch, setSelectedData }) => (
          <>
            <CustomButton
              content="Discount"
              color="yellow"
              icon={<SquarePercent />}
              className="roundend-md h-10"
              onClick={() => toggle("discount")}
              disabled={!selectedData[0]}
              tooltip={!selectedData[0] ? "Select row" : ""}
            />
            {selectedData[0] && (
              <DiscountModal
                {...{
                  open: modals.discount,
                  product: selectedData[0],
                  refetch,
                  setSelectedData,
                  handler: () => toggle("discount"),
                }}
              />
            )}
          </>
        ),
      },
    ],
  ];

  return { buttons };
};
