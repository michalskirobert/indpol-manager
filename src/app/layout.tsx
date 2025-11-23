import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { ToastContainer } from "react-toastify";

import "./global.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    template: "%s | Indpol Manager system",
    default: "Indpol Manager system",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <Providers session={session}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider defaultTheme="light" attribute="class">
            {children}
            <ToastContainer theme="colored" autoClose={3000} draggable />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
