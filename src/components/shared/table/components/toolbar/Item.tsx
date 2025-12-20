import { BtnProps, ItemProps, RenderComponentProps } from "../../types";
import { CircleX, RefreshCcw } from "lucide-react";
import { CustomButton } from "@/components/shared/button/CustomButton";

type Props = ItemProps & RenderComponentProps;

export const Item = ({ role, renderComponent, ...props }: Props) => {
  if (renderComponent) return renderComponent(props);

  const obj: Record<ItemProps["role"], BtnProps> = {
    clear: {
      color: "black",
      icon: <CircleX />,
      label: "Clear filters",
      disabled: !props.filters.length,
      onClick: props.refetch,
    },
    refetch: {
      color: "blue",
      icon: <RefreshCcw />,
      label: "Refresh",
      onClick: props.clearFilters,
    },
  };

  const currentObj = obj[role];

  return (
    <CustomButton
      content={currentObj.label}
      color={currentObj.color}
      icon={currentObj.icon}
      onClick={currentObj.onClick}
      className="h-10 rounded-md"
    />
  );
};
