const name = 'Clayclay';
export const siteTitle = 'Next.js Sample Website';

//* NextAuth *//
import NextAuthSessionProvider from "../providers/SessionProvider";

//* Material Ui *//

import ThemeRegistry from '../utils/ThemeRegistry'
import Container from '@mui/material/Container';


//* Components *//

import Header from '../components/Header.js';
import MainFeaturedPost from '../components/MainFeaturedPost.js';
import { sections }  from '../components/sectionsList.js' ;





//* FIN NextAuth *//

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

  
export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}



export default async function Layout({ children  }  ) {


const name = 'Clayclay';
const siteTitle = 'Next.js Sample Website';


  return ( 

    
  <html lang="en">
      <body   suppressHydrationWarning={true} >



        <Container maxWidth="lg">
        <main>

          <Header title={siteTitle} sections={sections} />
          <MainFeaturedPost post={mainFeaturedPost} />
          <ThemeRegistry options={{ key: 'mui-theme' }}>
            {children}

          </ThemeRegistry>

        </main>
        </Container>



    </body>
  </html>
  
  );
}




/* 
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
     
      <main>



        /*
  
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
  </ThemeProvider> */