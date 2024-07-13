
import prisma from "../../../lib/prisma.ts";

//import { PrismaClient } from '@prisma/client';
//const prisma = new PrismaClient();
import Container from "quill/blots/container";

 


  export default async function Post({params}){
    const id = params.id

    const posts = await prisma.post.findUnique({
      where: {
        id: id ,
      },
    })

return(
  <div>

{posts.title}
{posts.content}

  </div>
)

  }
