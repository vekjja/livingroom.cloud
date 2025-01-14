// src/app/components/UpcomingModal.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

interface UpcomingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpcomingModal({ open, onClose }: UpcomingModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        Donations and Subscriptions Coming Soon.
        <br />
        <Image
          src="https://images.stripeassets.com/fzn2n1nzq965/4M6d6BSWzlgsrJx8rdZb0I/733f37ef69b5ca1d3d33e127184f4ce4/Powered_by_Stripe.svg?q=80&w=1082"
          alt="Stripe Logo"
          width={100}
          height={100}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
