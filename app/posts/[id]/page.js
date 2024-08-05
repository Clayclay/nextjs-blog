
import prisma from "../../../lib/prisma.ts";
import dynamic from 'next/dynamic';

/*  MUI */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

/* QUILL */

// Importer en dynamic pour coté client quand server
const Quilledit = dynamic(() => import('./quilledit.js'), { ssr: false });

// COMPOSANT



export default async function Post({ params }) {

  const id = params.id
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  })




  return (

    <Container>

      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >

        Page server


        <Quilledit id={id} post={post} />

      </Grid>

    </Container>

  )

}

