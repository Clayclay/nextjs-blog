import { NextAuthOptions } from "next-auth";


import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        httpOptions: {
          timeout: 10000, // wait for response time, because the local environment often login timeout, so change this configuration
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID  as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET  as string,
      }),
    ],
    adapter: PrismaAdapter(prisma) ,
    secret: process.env.NEXTAUTH_SECRET, // required for production environments
    callbacks: {
      // triggered by getSession and useSession calls
      // documents https://next-auth.js.org/configuration/callbacks
      async session({ session, user }) {
        if (user.id && session?.user) {
          session.user.userId   = user.id;
          
        }
        return session;
      }
    }
  };
  