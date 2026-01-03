"use client";

import { CustomButton } from "@/components/shared/button/CustomButton";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export const InitError = () => {
  const router = useRouter();

  return (
    <main className="h-screen w-screen">
      <section className="flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="font-bold">
          Server unavailable or app out of date. Try again later or update the
          app.
        </h1>
        <CustomButton
          color="blue"
          content="Refresh application"
          icon={<RefreshCcw />}
          onClick={router.refresh}
        />
      </section>
    </main>
  );
};
