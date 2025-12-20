import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  hasGroup?: boolean;
}

export const Toolbar = ({ children, className, hasGroup }: Props) => {
  return (
    <div
      className={`mb-2 flex flex-wrap items-center gap-1 ${hasGroup ? "justify-between" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
