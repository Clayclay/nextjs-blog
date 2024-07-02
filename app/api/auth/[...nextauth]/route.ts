
//import NextAuth, { NextAuthOptions } from "next-auth";
//import { authOptions } from "@/utils/authoptions";

import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";


//import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../../lib/prisma";

import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";




//export  remove the export
const authOptions: NextAuthOptions = {
  providers: [
   /* GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      httpOptions: {
        timeout: 10000, // wait for response time, because the local environment often login timeout, so change this configuration
      }
    }),*/
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID  as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET  as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*
Behind the scenes, this creates all the relevant OAuth API routes within /api/auth/* so that auth API requests to:

GET /api/auth/signin
POST /api/auth/signin/:provider
GET/POST /api/auth/callback/:provider
GET /api/auth/signout
POST /api/auth/signout
GET /api/auth/session
GET /api/auth/csrf
GET /api/auth/providers
*/