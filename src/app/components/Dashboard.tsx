// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import TopBar from "./TopBar";
import { Box } from "@mui/material";
import OpenAIChat from "./OpenAIChat";
import Cloud from "../three/Cloud";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to home
  if (!session) {
    redirect("/");
  }

  return (
    <Box>
      <TopBar session={session} />
      <Cloud />
      <OpenAIChat />
    </Box>
  );
}
