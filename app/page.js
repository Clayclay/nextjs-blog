import { getSortedPostsData } from '../lib/posts.js';
//* Material Ui *//
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
//import theme from '../app/theme.js';
//* Components *//
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import MainFeaturedPost from '../components/MainFeaturedPost.js';
import FeaturedPost from '../components/FeaturedPost.js';
import Sidebar from '../components/Sidebar.js';
import { sections }  from '../components/sectionsList.js' ;
import { sidebar } from '../components/sidebarList.js';

//* NextAuth *//
import { signIn, signOut, getSession } from 'next-auth/react'

 
const name = 'Clayclay';
const siteTitle = 'Next.js Sample Website';

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

//**  Prisma **//
/* access to prisma client */
/*need to update it every time your Prisma:         npx prisma generate
some initial dummy data using Prisma Studio. Run the following command:               npx prisma studio            ADD DUMMY DATA
Push data :    npx prisma db push
*/


import prisma from '../lib/prisma.ts';
//* FIN NextAuth *//
const featuredPosts = [
  {
    title: 'Featured post1',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    link: 'Featured-post1'
  },
  { 
    title: 'Post title Featured',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
    link: 'Post-title-Featured'
  },
];


const session = await getSession()

console.log("session", session)

//*<Header title={siteTitle} sections={sections} />*//


    
export default async function Home({ }) {

 


    const allPostsData = await getSortedPostsData();

    /* A FAIRE voir si on laisse les datas en dur ou si on utilise la BDD */
    const feed = await prisma.post.findMany({
      where: { /*published: true */},
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    console.log("feed", /*feed*/)

  return (
   

 
    <Container maxWidth="lg">
     


        <main>

          <Header title={siteTitle} sections={sections} />
          <MainFeaturedPost post={mainFeaturedPost} />

  {/*  <     MainFeaturedPost post={mainFeaturedPost}          />   */}
       

          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>

          <Main title="From the allPostData" posts= {allPostsData}  />

            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>

          </main>
    </Container>
   

   



  );


}


//**//


//* Material Ui *//

/* 

export async function getStaticProps() {

  const allPostsData = getSortedPostsData();

  
 const allPostDataReformed = [] ;
 
  allPostsData.forEach((post) => (
    allPostDataReformed.push(
      post.content.toString()
              )
))

  return {
    props: {
      allPostsData
    },
    
  };
}*/
