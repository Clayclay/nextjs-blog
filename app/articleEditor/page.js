"use client";
import React,{ useCallback, useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';

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
  const [email , setEmail ] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
 


React.useEffect(() => {
  if (quill) {
    quill.on('text-change', (delta, oldDelta, source) => {
  //   console.log('Text change!');
    //  console.log(quill.getText()); // Get text only
      console.log("delta content" ,quill.getContents()); // Get delta contents
    //  console.log(quill.root.innerHTML); // Get innerHTML using quill
    //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
    setContent(quill.getContents());
  
  });
  }
}, [quill]);

 async function submitData(e) {
  e.preventDefault();

    if (quill && title && session ) {
     // quill.on('text-change', (delta, oldDelta, source) => {
     // Get delta contents
     
     setEmail(session.user.email);

     console.log('content', content)

     var json = JSON.stringify({ content });
console.log('json',json);

var obj = JSON.parse(json);
console.log('obj',obj.content);

        try {


          const res = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  
              //'API-Key': process.env.DATA_API_KEY!,
              },
            body: //JSON.stringify(body),
                     JSON.stringify({ title: title , email: email ,  content : json}),
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
 

    //  });
    }


    //e.preventDefault(); 
    /*
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }*/
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
