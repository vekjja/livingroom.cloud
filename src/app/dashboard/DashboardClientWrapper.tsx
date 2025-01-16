// src/app/dashboard/DashboardClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import DashboardContent
const DynamicDashboardContent = dynamic(() => import("./DashboardContent"), {
  ssr: false, // This disables SSR for DashboardContent
});

export default function DashboardClientWrapper() {
  return <DynamicDashboardContent />;
}
