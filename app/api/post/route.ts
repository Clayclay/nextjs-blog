import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../../lib/prisma';




// Handles POST requests to /api
export async function POST(request: Request) {

  const { title, email, content, publish, tag, categories, description } = await request.json()

  //console.log(' OBJET CREER : title', title, 'mail', email, 'content', content, 'tag', tag)
  console.log('recu', description, typeof categories)


  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: email } },
      published: publish,
      tags: {
        connectOrCreate:
          tag.map((element) => {
            return {
              where: { name: element },
              create: { name: element },
            };
          }),
      },
      categories: {
        connectOrCreate:
        {
          where: { name: categories },
          create: { name: categories },
        }
      },
      description: description
    },
    /* categories: {
       connectOrCreate: [{ name: 'Databases' }, { name: 'Tutorials' }],
 
     },*/

  });

  return NextResponse.json({ message: "Post Publish", result });


}


export async function PUT(request: NextRequest, res: NextResponse,) {
  //const postId = req.query.id;
  //const postId  = params.id

  const searchParams = request.nextUrl.searchParams;
  //console.log(searchParams)
  const id = searchParams.get('id');

  const { title, email, content, published, tag, categories, description, main } = await request.json()

  console.log("post", categories, main)

  const post = await prisma.post.update({
    where: {
      id: String(id)
    },
    data: {
      title: title,
      content: content,
      published: published,
      //author: { connect: { email: email } },
      main: main,
      tags: {
        connectOrCreate:
          tag.map((element) => {
            return {
              where: { name: element },
              create: { name: element },
            };
          }),
      },
      categories: {
        connectOrCreate:
        {
          where: { name: categories },
          create: { name: categories },
        }
      }, /*
      categories: {
        connectOrCreate:
          categories.map((element) => {
            return {
              where: { name: element },
              create: { name: element },
            }
          }),
      },*/
      description: description
    },


  });

  return NextResponse.json({ message: "On va EDIT", post });
}


// DELETE /api/post/:id
export async function DELETE(request: NextRequest, res: NextResponse) {

  const searchParams = request.nextUrl.searchParams;
  // console.log(searchParams)
  const id = searchParams.get('id');

  const post = await prisma.post.delete({
    where: { id: String(id) },
  })

  return res.json()


  //return   NextResponse.json({ message: "On va delete" , Response  }, {status: 200});

}
