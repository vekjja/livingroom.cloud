// src/app/components/DashboardContent.tsx
"use client";

import * as React from "react";
import { Box, Button } from "@mui/material";
import UpcomingModal from "./UpcomingModal";

export default function DashboardContent() {
  const [open, setOpen] = React.useState<boolean>(false);

  // Option: Automatically show the modal on mount.
  React.useEffect(() => {
    setOpen(true);
  }, []);

  // Alternatively, you can provide a manual trigger button.
  const handleOpenModal = () => setOpen(true);

  return (
    <Box>
      {/* Uncomment this button if you'd prefer a manual trigger */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Donations
      </Button>
      <UpcomingModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
