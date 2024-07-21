import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../../lib/prisma';



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




export  async function EDIT(req: NextRequest, res: NextResponse,  {params}) {
  //const postId = req.query.id;

  const postId  = params.id

  if (req.method === 'DELETE') {
    DELETE(postId ,/* res*/)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}


// DELETE /api/post/:id
export  async function DELETE(request :  NextRequest ) {


  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams)
  const id = searchParams.get('id');

  console.log("poop", id)
 /* const post = await prisma.post.delete({
    where: { id: String(postId) },
  })
  res.json(post)*/

  
  return NextResponse.json({ message: "On va delete"  });

}
