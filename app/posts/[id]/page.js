/******  SERVER ******/
import prisma from "../../../lib/prisma.ts";

/*  MUI */
import Container from '@mui/material/Container';



// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';
const ClientPost = dynamic(() => import('./clientpost.js'), { ssr: false });



/*NEXT-AUTH*/



export default async function Post({ params }) {


  const id = params.id

  try {
    const post = await prisma.post.findUnique({
      select: {
        authorId: true, content: true,
        createdAt: true,
        id: true,
        published: true,
        title: true,
        tags: true, // The password field is now selected.
        author: true,
        categories: true,
        main: true,
        image: true,

      },
      where: {
        id: id,
      },

    })


    const tags = await prisma.tag.findMany();

    const categories = await prisma.category.findMany();

    return (



      <ClientPost id={id} post={post} tags={tags} categories={categories} />


    )
  }

  catch (error) {
    return { message: 'Database Error: Failed ', };
  }

}

