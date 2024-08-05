
import prisma from "../../../lib/prisma.ts";
import dynamic from 'next/dynamic';

/*  MUI */
import Container from '@mui/material/Container';

/* QUILL */
// Importer en dynamic pour coté client quand server
const Quilledit = dynamic(() => import('./quilledit.js'), { ssr: false });

/*NEXT-AUTH*/



export default async function Post({ params }) {


  const id = params.id
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  })


  return (

    <Container>


      Page server


      <Quilledit id={id} post={post} />



    </Container>

  )

}

