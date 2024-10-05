//* SERVER*//

//import Main from '../components/Main.js';
/* QUILL */
// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';

import Container from '@mui/material/Container';

import MainContent from '../components/MainContent';
//DONT --> import Latest from '../components/Latest';
//DO --->
const Latest = dynamic(() => import('../components/Latest.js'), { ssr: false });

//**  Prisma **//
/* access to prisma client */
/*need to update it every time your Prisma:         npx prisma generate
some initial dummy data using Prisma Studio. Run the following command:               npx prisma studio            ADD DUMMY DATA
Push data :    npx prisma db push
*/

import prisma from '../lib/prisma.ts';

//* NextAuth *//
import { signIn, signOut, getSession } from 'next-auth/react';
//* FIN NextAuth *//

//* Google *//
import { GoogleMapsEmbed } from '@next/third-parties/google';



//const session = await getSession()

export default async function Home({ }) {

  //const allPostsData = await getSortedPostsData();

  /* A FAIRE voir si on laisse les datas en dur ou si on utilise la BDD */
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      //published: { select: true },
      author: {
        select: { name: true, image: true },
      },
      tags: {},
      categories: {},
    },
  });

  const categories = await prisma.category.findMany()

  const mainPosts = allPosts.filter((post) => Boolean(post.main))

  /*  <GoogleMapsEmbed
        apiKey={process.env.GOOGLE_MAPS_API_KEY}
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      /> */


  return (

    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <MainContent categories={categories} mainPosts={mainPosts} />
      <Latest title="From the allPostData" posts={allPosts} />
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
