// src/app/components/SignOutButton.tsx
"use client";

import { signIn } from "next-auth/react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SignInButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => signIn("google")}
          >
            {<GoogleIcon />} Google
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => signIn("discord")}
          >
            {<SportsEsportsIcon />} Discord
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => signIn("linkedin")}
          >
            {<LinkedInIcon />} LinkedIn
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
