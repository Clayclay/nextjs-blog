//import Layout, { siteTitle } from '../layout.js';
import Layout from '../../app/layout.js';

import { getAllPostIds, getPostData } from '../../lib/posts.js'


export default function Post({ postData }) {
  return (

    <Layout>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
   
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },

  };
}