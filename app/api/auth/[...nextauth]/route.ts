
//import NextAuth, { NextAuthOptions } from "next-auth";
//import { authOptions } from "@/utils/authoptions";

/*
import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";*/

import NextAuth from 'next-auth'

//import authOptions from '../../../../lib/authOptions'
import { authOptions } from '../../../../lib/auth';

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../../lib/prisma";

import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

//import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

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