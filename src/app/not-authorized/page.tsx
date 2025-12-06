"use client";

import { StopCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-gray-50">
      <div className="flex items-center gap-2">
        <h1 className="mb-4 text-5xl font-bold text-red-600">Access Denied</h1>
        <StopCircle size={60} fill="red" className="mb-3 text-white" />
      </div>
      <p className="max-w-md text-center text-lg text-gray-700">
        You do not have permission to view this page.
      </p>
      <p className="max-w-md text-center text-lg text-gray-700">
        Please contact your{" "}
        <Link className="text-red underline" href="/messages?role=admin">
          administrator
        </Link>{" "}
        if you believe this is an error.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-5 rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </main>
  );
}
