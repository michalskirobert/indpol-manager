import { CustomButton } from "@/components/shared/button/CustomButton";
import { ItemProps } from "@/components/shared/table/types";
import { ArrowUpDown, Pencil, Plus, SquarePercent } from "lucide-react";
import { useRouter } from "next/navigation";

export const useButtons = () => {
  const router = useRouter();

  const items: ItemProps[][] = [
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
        renderComponent: () => (
          <CustomButton
            content="Change stocks"
            color="purple"
            icon={<ArrowUpDown />}
            className="roundend-md h-10"
          />
        ),
      },
      {
        role: "custom",
        renderComponent: () => (
          <CustomButton
            content="Discount"
            color="yellow"
            icon={<SquarePercent />}
            className="roundend-md h-10"
          />
        ),
      },
    ],
  ];

  return items;
};
