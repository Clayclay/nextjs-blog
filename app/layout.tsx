
const name = 'Clayclay';
export const siteTitle = 'Next.js Sample Website';

//* NextAuth *//
import NextAuthSessionProvider from "../providers/SessionProvider";

//* Material Ui *//

import ThemeRegistry from '../utils/ThemeRegistry'

  
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

        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>



        </ThemeRegistry>






      </body>
    </html>
  );
}