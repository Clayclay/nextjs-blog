
//* NextAuth *//
import NextAuthSessionProvider from "../providers/SessionProvider";

//* Material Ui *//
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

//* Components *//
import Header from '../components/Header';



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

        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}><CssBaseline />
            <NextAuthSessionProvider>
              <Container maxWidth="lg"  >
                <Header title={siteTitle} />
                <main>

                  {children}

                </main>

              </Container>
            </NextAuthSessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}