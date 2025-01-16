// src/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          redirect_uri:
            process.env.NODE_ENV === "production"
              ? "https://livingroom.cloud/api/auth/callback/google"
              : "http://localhost:3000/api/auth/callback/google",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
