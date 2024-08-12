
import prisma from "../../../lib/prisma.ts";

/******  SERVER ******/
/*  MUI */
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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

    <Container>

      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {post.content}
      </Typography>
      <Typography variant="subtitle1" paragraph>
        {post.description}
        {post.id}
      </Typography>


      Page server


      <Quilledit id={id} post={post} />



    </Container>

  )

}

