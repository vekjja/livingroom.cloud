// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // note the path here
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to the login page
  if (!session) {
    redirect("/");
  }

  return (
    <main className="p-4">
      <h1>Welcome, {session.user?.name}</h1>
      <p>Your email: {session.user?.email}</p>
      <SignOutButton />
      <Link href="/">Back to Home</Link>
    </main>
  );
}
