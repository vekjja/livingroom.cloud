// src/app/components/SignOutButton.tsx
"use client";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";

export default function SignInButton() {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => signIn("google")}
    >
      Sign In
    </Button>
  );
}
