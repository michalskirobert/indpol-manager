import { Spinner } from "@material-tailwind/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

export const LoadingBlocker: React.FC<Props> = ({ children, isLoading }) => {
  if (isLoading)
    return (
      <div className="relative top-0 h-full w-full cursor-wait">
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
          <Spinner className="h-15 w-15" />
        </div>
        <div className="opacity-55">{children}</div>
      </div>
    );
  else return <>{children}</>;
};
