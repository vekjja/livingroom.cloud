// src/app/layout.tsx (server component)
import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "./providers/ClientProviders";

export const metadata: Metadata = {
  title: "Adventure Institute",
  description: "Your journey to the Adventure Institute starts here.",
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
