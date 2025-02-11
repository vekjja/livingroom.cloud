// src/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaClient } from "@prisma/client";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";

const prisma = new PrismaClient();

//  Redirect URL for OAuth providers
//  http://localhost:3000/api/auth/callback/[provider]
//  http://livingroom.cloud/api/auth/callback/[provider]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID || "",
      clientSecret: process.env.LINKEDIN_SECRET || "",
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      console.log("🔐signIn", user);
      if (!user.email) return;
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          provider_id: user.id,
          image: user.image,
          logins: { increment: 1 },
        },
        create: {
          email: user.email,
          name: user.name,
          provider_id: user.id,
          image: user.image,
          logins: 1,
        },
      });
    },
  },
};
