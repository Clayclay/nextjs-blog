import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';



import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content

import { cookies } from 'next/headers'
 


export default async function handler(req, res) {
  //const { title, content } = req.body;


  res.status(200).json({ text: 'Hello' });
/*
  console.log('title',title, 'content',content)
  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
  return NextResponse.json({message:'method allow'})
  */
}


