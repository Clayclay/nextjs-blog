
import prisma from "../../../lib/prisma.ts";

/******  SERVER ******/
/*  MUI */
import Container from '@mui/material/Container';



/* QUILL */
// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';
const Quilledit = dynamic(() => import('./quilledit.js'), { ssr: false });


/*NEXT-AUTH*/



export default async function Post({ params }) {


  const id = params.id

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    })

    return (
      <Container maxWidth="sm">

        Page server
        <Quilledit id={id} post={post} />

      </Container>

    )

  } catch (error) {
    return { message: 'Database Error: Failed ', };
  }







}

