import { ReactNode } from "react";

declare module "*.css";

export type Params<T = { id: string }> = {
  params: Promise<T>;
};
