//import { getSortedPostsData } from '../lib/TEMPOposts.js/index.js';

//* Material Ui *//
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


//* Components *//
//import Main from '../components/Main.js';
/* QUILL */
// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';
const Main = dynamic(() => import('../components/Main.js'), { ssr: false });



import MainFeaturedPost from '../components/MainFeaturedPost.js';
import FeaturedPost from '../components/FeaturedPost.js';
import Sidebar from '../components/Sidebar.js';

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

/* Menu List */


const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};



const featuredPosts = [
  {
    title: 'Featured post1erteg',
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

export default async function Home({ }) {

  //const allPostsData = await getSortedPostsData();


  /* A FAIRE voir si on laisse les datas en dur ou si on utilise la BDD */
  const allPosts = await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      //published: { select: true },
      author: {
        select: { name: true },
      },

    },
  });


  return (

    <div>
      <GoogleMapsEmbed
        apiKey={process.env.GOOGLE_MAPS_API_KEY}
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />


      <MainFeaturedPost post={mainFeaturedPost} />

      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>



      <Grid container spacing={5} sx={{ mt: 3 }}>

        <Main title="From the allPostData" posts={allPosts} />


        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>


    </div>



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
