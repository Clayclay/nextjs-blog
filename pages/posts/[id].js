//import Layout, { siteTitle } from '../layout.js';
import Layout2, { siteTitle } from '../layout2.js';

import { getAllPostIds, getPostData } from '../../lib/posts.js'
import Markdown from 'markdown-to-jsx';


//* Material Ui *//

import theme from '../theme.js';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//* Components *//

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sections }  from '../../components/menuList.js' ;


export default function Post({ postData }) {
  return (

    <Layout2>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout2>
   
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