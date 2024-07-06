import * as React from 'react';
import prisma from '../../../lib/prisma';





export default async function Post({params }) {
  

 const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  
  console.log("post",post, post?.id

  )

 

  return (
   
      post?.content        
    
)
}










//import Layout, { siteTitle } from '../layout.js';
//import Layout, { siteTitle } from '../../layout.js';
/** 

import { getAllPostIds, getPostData } from '../../../lib/posts.js'
import Markdown from 'markdown-to-jsx';


//* Material Ui */

//* Components *//
/** 
import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import { sections }  from '../../../components/sectionsList.js' ;


export default async function Post({ params }) {

  const postData = await getPostData(params.id); 
  const paths = getAllPostIds();

  return (

   
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    
   
  );
}
/*
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}*/

/*


est devenu const allPostsData = await getSortedPostsData();

///
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}*/