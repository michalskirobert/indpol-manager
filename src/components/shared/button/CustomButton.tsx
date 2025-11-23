import { Button, Spinner } from "@material-tailwind/react";
import { CustomButtonProps } from ".";

export const CustomButton = ({
  isLoading,
  icon,
  content,
  className,
  tooltip,
  ...restProps
}: CustomButtonProps) => {
  return (
    <span title={tooltip}>
      <Button
        {...{
          variant: "filled",
          className: `${className} inline-flex items-center justify-center gap-2`,
          ...restProps,
          disabled: isLoading || restProps.disabled,
        }}
      >
        {isLoading ? <Spinner height={17} /> : icon} {content}
      </Button>
    </span>
  );
};
