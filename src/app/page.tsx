// src/app/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

import Cloud from "./three/Cloud";
import Dashboard from "./components/Dashboard";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <Dashboard />;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ flexGrow: 1 }} />
      </Box>

      <Box sx={{ margin: "18%", textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Living Room Cloud
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          The Cloud Behind The Couch
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "40vh",
            top: "1%",
            zIndex: -1,
            position: "relative",
          }}
        >
          <Cloud alpha={true} />
        </Box>
      </Box>
    </Box>
  );
}