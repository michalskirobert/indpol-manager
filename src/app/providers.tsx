"use client";

import { store } from "@store/index";
import { Provider } from "react-redux";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { InitContextType, InitProvider } from "./InitProvider";

export function Providers({
  children,
  session,
  init,
}: {
  children: React.ReactNode;
  session: Session | null;
  init: InitContextType;
}) {
  return (
    <Provider store={store}>
      <InitProvider init={init}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </InitProvider>
    </Provider>
  );
}
