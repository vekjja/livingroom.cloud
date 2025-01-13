// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import NextAuthSessionProvider from "./providers/SessionProvider";

export const metadata: Metadata = {
  title: "My App",
  description: "Login with Google example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
