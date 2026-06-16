// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import ClientProviders from "./ClientProviders";
import { Box, Typography } from "@mui/material";
import SignInButton from "./components/SignInButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Living Room Cloud",
  description: "The Cloud Behind The Couch",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}

          {!session && (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                p: "1rem",
                mt: "100vh",
              }}
            >
              <SignInButton />

              <Link
                href="/privacy"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Privacy Policy
                </Typography>
              </Link>
            </Box>
          )}
        </ClientProviders>
      </body>
    </html>
  );
}