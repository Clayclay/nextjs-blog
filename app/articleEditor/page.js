"use client";
import React,{ useCallback, useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';

/*QUILL*/
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

/*MUI*/
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';



const quill = dynamic(() => import('react-quill'), { ssr: false });



export default function Home() {

  const [title, setTitle] = useState('');
  const { quill, quillRef } = useQuill();

  console.log('quill',quill);    // undefined > Quill Object
  console.log('quillref',quillRef); // { current: undefined } > { current: Quill Editor Reference }


  /*
  const [content, setContent] = useState('');
 
  
  const [editorContent, setEditorContent] = useState('');
  const [value, setValue] = useState('');

*/



  const submitData = async () => {



    console.log('value',value, '//content',content,"///edit content",editorContent,'///title',title);
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

