"use client";

import { store } from "@store/index";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {/* <AuthProvider> */}
        {/* <ThemeProvider defaultTheme="light" attribute="class"> */}
        {children}
        {/* </ThemeProvider> */}
        {/* </AuthProvider> */}
      </SessionProvider>
      <ToastContainer theme="colored" autoClose={3000} draggable />
    </Provider>
  );
}
