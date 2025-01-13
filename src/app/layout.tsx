// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "Adventure Institute",
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
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
