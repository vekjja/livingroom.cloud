// src/app/components/TopBar.tsx
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Session } from "next-auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import { Avatar, Typography } from "@mui/material";

interface TopBarProps {
  session: Session | null;
}

export default function TopBar({ session }: TopBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {session ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={session.user?.image}
                alt={session.user?.name}
                sx={{ marginRight: 2 }}
              />
              <Typography variant="h6" component="div">
                Welcome, {session.user?.name}
              </Typography>
            </Box>
          ) : (
            ""
          )}
          <Box sx={{ flexGrow: 1 }} />
          {session ? <SignOutButton /> : <SignInButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
