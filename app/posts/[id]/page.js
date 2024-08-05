
import prisma from "../../../lib/prisma.ts";
import dynamic from 'next/dynamic';

//* Components *//
import Header from '../../../components/Header.js';
import Main from '../../../components/Main.js';
import MainFeaturedPost from '../../../components/MainFeaturedPost.js';
import FeaturedPost from '../../../components/FeaturedPost.js';
import Sidebar from '../../../components/Sidebar.js';


import Postupdate from "./postupdate.js";

/*  MUI */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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

        Page Pour le server


        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {post.content}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {post.id}
        </Typography>

        <Quilledit id={id} post={post} />

      </Grid>

    </Container>

  )

}

