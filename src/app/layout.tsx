import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "next-themes";
import { getCollection } from "@/lib/mongodb";
import { DictionaryParams } from "@/types/dictionaries";
import { InitContextType } from "./InitProvider";

import { InitError } from "./InitError";

import "./global.css";

let cachedInit: InitContextType | null = null;

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

  if (!cachedInit) {
    const dictionariesCollection = (
      await getCollection<DictionaryParams>("store", "dictionaries")
    ).find();

    const dictionaries = (await dictionariesCollection.toArray()) || [];

    const plainDictionaries = dictionaries.map((d) => ({
      ...d,
      _id: d._id.toString(),
    }));

    cachedInit = { dictionaries: plainDictionaries };
  }

  return (
    <Providers init={cachedInit} session={session}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider defaultTheme="light" attribute="class">
            {cachedInit ? children : <InitError />}
            <ToastContainer theme="colored" autoClose={3000} draggable />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}

export function getInit() {
  if (!cachedInit) return { dictionaries: [] };

  return cachedInit;
}
