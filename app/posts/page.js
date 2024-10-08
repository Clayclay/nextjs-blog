import prisma from '../../lib/prisma';

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

/*QUILL*/
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
const QuillRead = dynamic(() => import('./QuillRead.js'), { ssr: false });

const posts = await prisma.post.findMany({
  where: { /*published: true*/ },
  include: {
    author: {
      select: { name: true },
    },
  },
});


export default async function Page({ }) {

  return (

    <Container sx={{ paddingTop: '15px' }}>
      {posts.reverse().map((post) => (
        <QuillRead post={post} />
      ))}
    </Container>

  )
}