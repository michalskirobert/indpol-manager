import { ItemProps, RenderComponentProps } from "../../types";
import { CircleX, RefreshCcw, Trash } from "lucide-react";
import { CustomButton } from "@/components/shared/button/CustomButton";
import { CustomButtonProps } from "@shared/button/index";

type Props<T extends Record<string, any>> = ItemProps<T> &
  RenderComponentProps<T>;

export const Item = <T extends Record<string, any>>({
  role,
  renderComponent,
  ...props
}: Props<T>) => {
  if (renderComponent) return renderComponent(props);

  const obj: Record<ItemProps<T>["role"], CustomButtonProps> = {
    custom: {},
    delete: {
      color: "red",
      icon: <Trash />,
      content: "Delete",
      disabled: !props.selectedKeysState.length,
      tooltip: !props.selectedKeysState.length ? "Select row to remove" : "",
      onClick: props.toggleWarningModal,
    },
    clear: {
      color: "black",
      icon: <CircleX />,
      content: "Clear filters",
      disabled: !props.filters.length,
      tooltip: !props.filters.length ? "No filters applied yet" : "",
      onClick: props.clearFilters,
    },
    refetch: {
      color: "blue",
      icon: <RefreshCcw />,
      content: "Refresh",
      onClick: props.refetch,
    },
  };

  return <CustomButton {...obj[role]} className="h-10 rounded-md" />;
};
