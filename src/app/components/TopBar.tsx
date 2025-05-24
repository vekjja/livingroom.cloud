// src/app/components/TopBar.tsx
"use client";

import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Session } from "next-auth";
import DonateButton from "./DonateButton";
import SignOutButton from "./SignOutButton";
import Cloud from "../three/Cloud";

interface TopBarProps {
  session: Session;
}

export default function TopBar({ session }: TopBarProps) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 8 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Avatar
              src={session.user?.image || ""}
              alt={session.user?.name || ""}
              sx={{ marginRight: 2 }}
            />
            <Typography variant="h6" component="div">
              Welcome, {session.user?.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                width: "100px",
                height: "90px",
                zIndex: isSmallScreen ? -1 : 0,
                position: isSmallScreen ? "absolute" : "relative",
                top: isSmallScreen ? "100%" : "auto",
                left: isSmallScreen ? "50%" : "auto",
                transform: isSmallScreen ? "translateX(-50%)" : "none",
              }}
            >
              <Cloud alpha={true} />
            </Box>
            <DonateButton />
            <SignOutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
