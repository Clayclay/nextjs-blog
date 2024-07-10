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
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}

*/




export async function GET(request: Request) {
  
  const { id} = await request.json()
/*
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

 console.log(searchParams,id)
*/
 console.log(id)

 const post = await prisma.post.findUnique({
  where: {
    id: String(id),
  },
  include: {
    author: {
      select: { name: true },
    },
  },
});
  
  return Response.json({ post })

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


