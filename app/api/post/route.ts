import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../../lib/prisma';



// Handles POST requests to /api
export async function POST(request: Request) {


  const { title, email, content } = await request.json()

  console.log(' OBJET CREER : title', title, 'mail', email, 'content', content)


  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: email } },
    },
  });

  return NextResponse.json({ message: "Post Publish", result });
}


export async function PUT(request: NextRequest, res: NextResponse,) {
  //const postId = req.query.id;
  //const postId  = params.id

  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams)
  const id = searchParams.get('id');

  const { title, email, content, published } = await request.json()

  const post = await prisma.post.update({
    where: {
      id: String(id)
    },
    data: {
      title: title,
      content: content,
      published: published
      //author: { connect: { email: email } },
    },

  });

  return NextResponse.json({ message: "On va EDIT", post });
}



// DELETE /api/post/:id
export async function DELETE(request: NextRequest, res: NextResponse) {


  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams)
  const id = searchParams.get('id');

  console.log("poop", id)


  const post = await prisma.post.delete({
    where: { id: String(id) },
  })

  return res.json()


  //return   NextResponse.json({ message: "On va delete" , Response  }, {status: 200});

}
