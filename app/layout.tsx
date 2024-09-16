
//* NextAuth *//
import NextAuthSessionProvider from "../providers/SessionProvider";

//* Material Ui *//
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

//* Components *//

import AppAppBar from "../components/AppAppBar";
import Footer from '../components/Footer';

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

              <AppAppBar />

              <main>

                {children}

              </main>
              <Footer />

            </NextAuthSessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}