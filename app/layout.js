import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';



const name = 'Clayclay';
export const siteTitle = 'Next.js Sample Website';


//* Material Ui *//

import theme from './theme.js';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//* Components *//

import Header from '../components/Header.js';
import Main from '../components/Main.js';
import MainFeaturedPost from '../components/MainFeaturedPost.js';
import FeaturedPost from '../components/FeaturedPost.js';
import Sidebar from '../components/Sidebar.js';
import Footer from '../components/Footer.js';


import { sections }  from '../components/sectionsList.js' ;
import { sidebar } from '../components/sidebarList.js';
  
export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}


export default function Layout({ children, home }) {
  return (


<html lang="en">
      <body>

    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
     
      <main>
  
      <Header title={siteTitle} sections={sections} />


        {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}


      <Grid container spacing={5} sx={{ mt: 3 }}>


        <Grid item
      xs={12}
      md={8}
      sx={{  '& .markdown': { py: 3,  },
      }}
    >
        <main>{children}</main>
      </Grid>

      
      <Sidebar
        title={sidebar.title}
        description={sidebar.description}
        archives={sidebar.archives}
        social={sidebar.social}
      />

        </Grid>
      </main>
    </Container>
    <Footer
      title="Footer"
      description="Something here to give the footer a purpose!"
    />
  </ThemeProvider>

  </body>
    </html>

  );
}