"use client";
import React,{ useCallback, useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';

import prisma from '../../lib/prisma';


/*QUILL*/
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
const quill = dynamic(() => import('react-quill'), { ssr: false });

/*MUI*/
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';



/* Next Auth */

import { useSession } from "next-auth/react";


export default function Home() {

  const { quill, quillRef } = useQuill();

  //console.log('quill',quill);    // undefined > Quill Object
 // console.log('quillref',quillRef); // { current: undefined } > { current: Quill Editor Reference }

  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 


React.useEffect(() => {
  if (quill) {
    quill.on('text-change', (delta, oldDelta, source) => {
    //  console.log('Text change!');
    //  console.log(quill.getText()); // Get text only
    //  console.log("delta content" ,quill.getContents()); // Get delta contents
    //  console.log(quill.root.innerHTML); // Get innerHTML using quill
    //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
    setContent(quill.getContents());
  
  });
  }
}, [quill]);

 async function submitData(e) {
  e.preventDefault();

    if (quill && title && session.user.email ) {
     // quill.on('text-change', (delta, oldDelta, source) => {
     // Get delta contents
     
     console.log('content', content)

      /*var json = JSON.stringify({ content });
      console.log('json',json);

      var obj = JSON.parse(json);
      console.log('obj',obj.content);*/


const NewPost = await prisma.post.create({
  data: {
    title:title,
    content:content,
    author: email,
  },
})

console.log("newpost", NewPost)

/*

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
 */

    //  });
    }
  };


  return (
    
    <Container maxWidth="sm">
<CssBaseline />
  <Box sx={{ marginTop: 8  }} >
    <Typography component="h1"  variant="h5">
      Editor Content
    </Typography>

    <TextField
          required
          fullWidth
          variant="standard"
          label="title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          sx={{ mt: 4 }} 
         
    />

    <Box sx={{  mt:2 }} >
    <div ref={quillRef} />
    </Box>
      
      
      <Button  type="submit" onClick={submitData} variant="contained" sx={{ mt: 2,/*mb: 2*/
    }}>
          Submit
      </Button>
        
    </Box>
  </Container>
  );
}

