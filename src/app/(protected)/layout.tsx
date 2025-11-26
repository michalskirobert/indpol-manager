"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";
import { PropsWithChildren, useEffect } from "react";
import NextTopLoader from "nextjs-toploader";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/slices/auth";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(session?.user || null));
  }, [session?.user]);

  if (!session?.user) redirect("/sign-in");

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
