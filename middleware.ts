import { NextFetchEvent, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

import { User } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware"


export async function middleware(req: NextRequest, ev: NextFetchEvent) { }

