"use client";

import { store } from "@store/index";
import { Provider } from "react-redux";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
}
