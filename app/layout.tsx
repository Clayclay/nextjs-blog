


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




/* Menu List */

export const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];





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

                <Header title={siteTitle} sections={sections} />

                {children}

              </main>

            </Container>

          </NextAuthSessionProvider>

        </ThemeRegistry>


      </body>
    </html>
  );
}