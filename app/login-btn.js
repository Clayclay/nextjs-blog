
import { useSession, signIn, signOut } from "next-auth/react"
import Container from '@mui/material/Container';

import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route.ts"; 

import LogIn from "../app/LogIn/page";



export default  function loginbtn() {

  //const { data: session } = useSession()

  const session = getServerSession(authOptions);


  if (session) {
    console.log('session',session.user)
   
  }else {
    return console.log("pas de session")
  }
  return (
   
    
    <>

loginbtn<br />

      Not signed in <br /><br />
      
     
      
    </>
  
  )

  
}