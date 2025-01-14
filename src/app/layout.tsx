// src/app/layout.tsx (server component)
import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "./providers/ClientProviders";

export const metadata: Metadata = {
  title: "Living Room Cloud",
  description: "My Living Room, Your Cloud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
