"use client";

import { useSession } from "next-auth/react";
import {  signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  console.log("session" , session)
 
/*
  return (
    <>
      <div>This is a protected route</div>
    </>
  );
*/

console.log("test variable ",process.env.GOOGLE_CLIENT_ID)



  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

if (session?.error === "RefreshAccessTokenError") {
 
  signIn(); // Force sign in to hopefully resolve error 
  <>
  Not signed in , session error <br /></>
  console.log('error',session.error)
}


  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>

      
    </>
  )



}