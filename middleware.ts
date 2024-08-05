import { NextFetchEvent, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

import { User } from "next-auth";
import { headers } from "next/headers";

import { NextResponse } from 'next/server';





export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const session = await getSession({
        req: {
            ...req,
            headers: {
                ...Object.fromEntries(req.headers),
            },
        },
    });

    console.log('session', session, 'user', session?.user

    )

    //const currentUser = session?.user;                                
    const currentUser = session;

    //const currentUser = request.cookies.get('currentUser')?.value

    if (currentUser && !req.nextUrl.pathname.startsWith('/NewPost')) {
        return Response.redirect(new URL('/NewPost', req.url))
    }
    // /dashboard

    if (!currentUser && !req.nextUrl.pathname.startsWith('/logIn')) {
        return Response.redirect(new URL('/logIn', req.url))
    }
}///login



export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}