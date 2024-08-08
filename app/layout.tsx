


//* NextAuth *//
import NextAuthSessionProvider from "../providers/SessionProvider";

//* Material Ui *//

import ThemeRegistry from '../utils/ThemeRegistry';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

//* Components *//
import Header from '../components/Header';
import Sidebar from '../components/Sidebar.js';


const name = 'Clayclay';
const siteTitle = 'Next.js Sample Website';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>


        <ThemeRegistry options={{ key: 'mui-theme' }}>

          <NextAuthSessionProvider>

            <Container maxWidth="lg">
              <main>

                <Header title={siteTitle} />

                {children}

              </main>

            </Container>

          </NextAuthSessionProvider>

        </ThemeRegistry>


      </body>
    </html>
  );
}