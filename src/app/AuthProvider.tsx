"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      session.status === "unauthenticated" &&
      !pathname.includes("/auth/sign-in")
    ) {
      router.push("/auth/sign-in");
    }

    if (
      session.data &&
      !session.data?.user.permissions.modules.includes(pathname)
    ) {
      router.push("/not-authorized");
    }
    console.log("render");
    setIsLoading(false);
  }, [session.status, pathname, router]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}
