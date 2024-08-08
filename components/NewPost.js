"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

/*QUILL*/
//import dynamic from 'next/dynamic';
//
import 'quill/dist/quill.snow.css'; // Add css for snow theme
//import from server to client component
//const quill = dynamic(() => import('react-quill'), { ssr: false });

import ReactQuill from "react-quill";


/*MUI*/
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



/* Next Auth */

import { useSession } from "next-auth/react";



export default function NewPost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [value, setValue] = useState();
  const [title, setTitle] = useState('');
  const [publish, setPublish] = useState(false);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        // image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: true,
    },
  }

  const handlePublish = (event) => {
    setPublish(event.target.value === "true" ? true : false);
  };


  async function submitData(e) {
    e.preventDefault();

    if (title && session.user) {

      try {


        const res = await fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'API-Key': process.env.DATA_API_KEY!,
          },
          body: //JSON.stringify(body),
            JSON.stringify({ title: title, email: session?.user.email, content: value, publish: publish }),
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
          New Post
        </Typography>



        <Stack spacing={2} mt={2}>

          <TextField
            required
            fullWidth
            //variant="standard"
            variant="outlined"
            margin="normal"
            label="Title"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            sx={{ mt: 4 }}
          />

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            formats={formats}
            modules={modules}
          />

          <FormControl>

            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={publish}
              onChange={handlePublish}
            >
              <FormControlLabel value={true} control={<Radio />} label="publish" />
              <FormControlLabel value={false} control={<Radio />} label="unpublish" />
            </RadioGroup>
          </FormControl>


        </Stack>

        <Button type="submit" onClick={submitData} variant="contained" sx={{
          mt: 2,/*mb: 2*/
        }}>
          Submit
        </Button>

      </Box>
    </Container>
  );
}

