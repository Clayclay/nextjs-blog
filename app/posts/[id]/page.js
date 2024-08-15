
import prisma from "../../../lib/prisma.ts";

/******  SERVER ******/
/*  MUI */
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';


/* QUILL */
// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';
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

    <Container maxWidth="sm">


      Page server


      <Quilledit id={id} post={post} />



    </Container>

  )

}

