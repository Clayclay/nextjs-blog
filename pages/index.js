
import Layout from '../app/layout.js';

import { getSortedPostsData } from '../lib/posts.js';

//* Material Ui *//


import Grid from '@mui/material/Grid';

//* Components *//

import Main from '../components/Main.js';
import MainFeaturedPost from '../components/MainFeaturedPost.js';
import FeaturedPost from '../components/FeaturedPost.js';
import Sidebar from '../components/Sidebar.js';

import { sidebar } from '../components/sidebarList.js';



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
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];



//* Material Ui *//
 
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
      allPostDataReformed
    },
    
  };
}



export default function Home({ allPostDataReformed }) {
  return (
    <Layout home>
     

          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>


 
          <Main title="From the allPostData" posts= {allPostDataReformed}  />

        
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>



    </Layout>
  );


}
