// src/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      if (!user.email) return;
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          google_id: user.id,
          image: user.image,
          logins: { increment: 1 },
        },
        create: {
          email: user.email,
          name: user.name,
          google_id: user.id,
          image: user.image,
          logins: 1,
        },
      });
    },
  },
};
