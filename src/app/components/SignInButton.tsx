// src/app/components/SignOutButton.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button, Box } from "@mui/material";

export default function SignInButton() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => signIn("google")}
      >
        Sign In
      </Button>
    </Box>
  );
}
