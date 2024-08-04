"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation'

/*QUILL*/
//import dynamic from 'next/dynamic';
//
import 'quill/dist/quill.snow.css'; // Add css for snow theme
//import from server to client component
//const quill = dynamic(() => import('react-quill'), { ssr: false });

import ReactQuill from "react-quill";
import { useQuill } from 'react-quilljs';

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
  const { data: session } = useSession()
  const router = useRouter()
  /*const { quill, quillRef } = useQuill({
  formats: [
     'bold', 'italic', 'underline', 'strike',
     'align', 'list', 'indent',
     'size', 'header',
     'link', 'image', 'video',
     'color', 'background',
     //'clean',
   ],
 });*/


  const [value, setValue] = useState();
  const [title, setTitle] = useState('');


  async function submitData(e) {
    e.preventDefault();

    if (title && session.user.email) {

      try {


        const res = await fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'API-Key': process.env.DATA_API_KEY!,
          },
          body: //JSON.stringify(body),
            JSON.stringify({ title: title, email: session?.user.email, content: value }),
        })

        if (!res.ok) {
          console.log('Failed to fetch data')
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }

        const data = await res.json()
        console.log('reponse', data, 'data')

        // return Response.json({ data })


        alert(data.message);
        await router.push(`/posts/${data.result.id}`);

      } catch (error) {
        console.error(error);
      }


      //  });
    }
  };


  return (

    <Container maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 8 }} >
        <Typography component="h1" variant="h5">
          Editor Content
        </Typography>

        <TextField
          required
          fullWidth
          variant="standard"
          label="title"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          sx={{ mt: 4 }}

        />


        <ReactQuill theme="snow" value={value} onChange={setValue} />


        <Button type="submit" onClick={submitData} variant="contained" sx={{
          mt: 2,/*mb: 2*/
        }}>
          Submit
        </Button>

      </Box>
    </Container>
  );
}

