import { NextFetchEvent, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

import { User } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware"


export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    const session = await getSession({
        req: {
            ...req,
            headers: {
                ...Object.fromEntries(req.headers),
            },
        },
    });

    //console.log('session', session, 'user', session?.user)
    }


/*

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    async function middleware(req: NextRequest, ev: NextFetchEvent) {

        const session = await getSession({
            req: {
                ...req,
                headers: {
                    ...Object.fromEntries(req.headers),
                },
            },
        });

        console.log('session', session, 'user', session?.user

        )}
            ,
        {
            callbacks: {
                authorized: ({ token }) => token?.role === "user",
            },
        },
  )

export const config = { matcher: ["/dashboard"] }

*/



    /*
        //const currentUser = session?.user;                                
        const currentUser = session;
    
        //const currentUser = request.cookies.get('currentUser')?.value
    
        if (currentUser && !req.nextUrl.pathname.startsWith('/dashboard')) {
            return Response.redirect(new URL('/dashboard', req.url))
             // This logic is only applied to /dashboard
        }
        // /dashboard
    
        if (!currentUser && !req.nextUrl.pathname.startsWith('/login')) {
            return Response.redirect(new URL('/login', req.url))
        }
        ///login
    */


//Now you will still be able to visit every page, but only /dashboard will require authentication.





