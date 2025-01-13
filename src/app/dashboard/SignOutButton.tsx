// src/app/dashboard/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="border rounded p-2 mt-4"
    >
      Sign out
    </button>
  );
}
