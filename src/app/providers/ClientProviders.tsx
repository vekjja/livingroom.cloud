// src/app/ClientProviders.tsx
"use client";

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NextAuthSessionProvider from "./SessionProvider";
import createEmotionCache from "../../lib/createEmotionCache";
import theme from "../../lib/theme";
// Create a client-side Emotion cache
const clientSideEmotionCache = createEmotionCache();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
