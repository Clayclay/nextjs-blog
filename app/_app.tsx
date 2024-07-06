'use client'
//*  Client Component *//


import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'




interface Props {
  session: Session | null
}


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />


    </SessionProvider>
  )
}

