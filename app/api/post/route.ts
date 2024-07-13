import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

import prisma from '../../../lib/prisma';


import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
 
/*
export async function GET(request: Request) {}
 
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {
  return NextResponse.json({ message: "PUT"  });
}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
*/


export async function GET(request: Request) {

  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  console.log('feed',feed)
  return NextResponse.json({feed});
}


// Handles POST requests to /api
export async function POST(request: Request) {


  const { title , email , content} = await request.json()

  console.log('title', title,'mail', email , 'content' ,content)
  
    
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: email } },
    },
  });


  return NextResponse.json({ message: "On va poster" , result });

}



