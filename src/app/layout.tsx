import { Sidebar } from "@/components/layout/sidebar";

import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@lib/auth";

import "./global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Indpol Manager system",
    default: "Indpol Manager system",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <Providers session={session}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />
              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}
