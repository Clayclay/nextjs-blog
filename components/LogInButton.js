"use client";

/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"

/*MUI*/
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


export default function LogInButton() {
  const { data: session } = useSession();


  /*
    return (
      <>
        <div>This is a protected route</div>
      </>
    );
  */


  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />

        <Button variant="outlined" size="small" onClick={() => signOut()}  /* LinkComponent={Link}  href="/sign-in" */ >
          Sign Out
        </Button>
      </>
    )
  }

  if (session?.error === "RefreshAccessTokenError") {

    signIn(); // Force sign in to hopefully resolve error 
    <>
      Not signed in , session error <br /></>
    console.log('error', session.error)
  }


  return (
    <>
      <Button variant="outlined" size="small" onClick={() => signIn()} /* LinkComponent={Link}  href="/sign-in" */ >
        Sign up
      </Button>
    </>
  )



}