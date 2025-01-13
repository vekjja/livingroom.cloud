// src/app/page.tsx

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  // While waiting for session, you might choose to render a loading state
  if (session) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-bold">Login</h1>
      <button
        onClick={() => signIn("google")}
        className="border rounded p-2"
      >
        Sign in with Google
      </button>
    </div>
  );
}
