import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { NextRequest } from "next/server";

import prisma from '../../../../lib/prisma';



import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';



export  default async function GET({ params }) {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  //return {    props: post,  };
  return NextResponse.json({ message: "post find" , post });
};

/*

export async function GET(request: Request,  { params }: { params: { id: string } }) {

    console.log(params.id);
   
    const id = params.id ;
    //console.log(request.url.URLSearchParams.get("keyword"))
    //const id = request.url.split("post/")[1];
    console.log('id',id)

    const feed = await prisma.post.findUnique({
      where: {  id: String({id})      },

    });

    console.log('feed',feed)
    //return NextResponse.json({feed});  
    
  return NextResponse.json({ message: "On a trouve" , feed });
  }



  
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
  
   console.log(searchParams,id)


}
  */