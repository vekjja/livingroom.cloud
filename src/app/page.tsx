// src/app/login/page.tsx

"use client"; // This page uses client components

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // If the user is already logged in, you might want to redirect them
  if (session) {
    // Optionally, you can redirect client-side or simply show a message
    // For example, using Next.js navigation:
    router.push('/dashboard');
    return (
      <div>
        <p>You are already logged in as {session.user?.name}</p>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    );
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
