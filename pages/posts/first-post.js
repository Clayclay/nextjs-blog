import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

// <head > --> browser tab should now say  “First Post”.
export default function FirstPost() {
  return (
    <>
     <Head>
        <title>First Post</title>
        <script src="https://connect.facebook.net/en_US/sdk.js" />
        <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}