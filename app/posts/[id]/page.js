//import Layout, { siteTitle } from '../layout.js';
import Layout, { siteTitle } from '../../layout.js';

import { getAllPostIds, getPostData } from '../../../lib/posts.js'
import Markdown from 'markdown-to-jsx';


//* Material Ui *//




//* Components *//

import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import { sections }  from '../../../components/sectionsList.js' ;


export default async function Post({ params }) {

  const postData = await getPostData(params.id); 

  return (

   
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    
   
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

/*
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}*/