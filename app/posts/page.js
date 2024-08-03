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
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';


const posts = await prisma.post.findMany({
  where: { published: true },
  include: {
    author: {
      select: { name: true },
    },
  },
});


export default async function Page({ }) {



  return (


    <Container>



      <Paper sx={{
        mb: 4
      }}>
        <Box>
          <Grid container>
          </Grid>
        </Box>
      </Paper>


      {posts.map((post) => (



        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href={"/posts/" + post.id}>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.date}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.content}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                image={post.image}
                alt={post.imageLabel}
              />
            </Card>
          </CardActionArea>



        </Grid>










      ))}


    </Container>

  )
}