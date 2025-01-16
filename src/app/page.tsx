// src/app/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TopBar from "./components/TopBar";
import { Box, Link } from "@mui/material";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // While waiting for session, you might choose to render a loading state
  if (session) {
    return <p>Redirecting...</p>;
  }

  return (
    <Box>
      <TopBar session={session} />
      <Box margin={"18%"}>
        <Typography variant="h2" gutterBottom>
          Living Room Cloud
        </Typography>
        <Typography variant="body1" gutterBottom>
          The Cloud Behind The Couch
        </Typography>
      </Box>
    </Box>
  );
}
