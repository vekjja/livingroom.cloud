// src/app/ClientProviders.tsx
"use client";

import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "../createEmotionCache";
import theme from "../theme";
import NextAuthSessionProvider from "./providers/SessionProvider";

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
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
