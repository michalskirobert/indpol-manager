"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { DictionaryParams } from "@/types/dictionaries";
import { ProductStatus } from "@/types/products";

export interface InitContextType {
  dictionaries: DictionaryParams[];
}

const InitContext = createContext<InitContextType>({
  dictionaries: [],
});

export function InitProvider({
  init,
  children,
}: PropsWithChildren<{ init: InitContextType }>) {
  return <InitContext.Provider value={init}>{children}</InitContext.Provider>;
}

export const useInit = () => useContext(InitContext);

export default InitContext;
