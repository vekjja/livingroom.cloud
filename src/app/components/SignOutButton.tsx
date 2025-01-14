// src/app/components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";

export default function SignOutButton() {
  return (
    <Button variant="contained" color="secondary" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
