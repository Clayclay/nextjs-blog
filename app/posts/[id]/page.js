
import prisma from "../../../lib/prisma.ts";

//* Components *//
import Header from '../../../components/Header.js';
import Main from '../../../components/Main.js';
import MainFeaturedPost from '../../../components/MainFeaturedPost.js';
import FeaturedPost from '../../../components/FeaturedPost.js';
import Sidebar from '../../../components/Sidebar.js';
import { sections }  from '../../../components/SectionsList.js' ;
import { sidebar } from '../../../components/SidebarList.js';


/*  MUI */ 
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

const siteTitle = 'Next.js Sample Website';


  export default async function Post({params}){
    const id = params.id

    const post = await prisma.post.findUnique({
      where: {
        id: id ,
      },
    })

    async function DeletePost(){

      console.log("on va delete");

      try {


        const res = await fetch('/api/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',  
            //'API-Key': process.env.DATA_API_KEY!,
            },
          body: //JSON.stringify(body),
                   JSON.stringify({ title: title , email: session?.user.email ,  content : json}),
        })
        
        if (!res.ok) {
          console.log('Failed to fetch data')
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        const data = await res.json()
        console.log(data,'data')

        // return Response.json({ data })


        //await Router.push('/drafts');
        //const { message } = await response.json();
        //alert(message);


      } catch (error) {
        console.error(error);
      }

    }

return(

<Container>

<main>
<Header title={siteTitle} sections={sections} />

<Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
    
          
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.content}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>


            <Button variant="contained" onClick={() => { console.log('onClick'); }}>Update</Button>
            
            <Button variant="outlined"  onClick={() => { console.log('onClick'); }}>Delete</Button>
        
     
    </Grid>
    </main>
</Container>

)

  }
