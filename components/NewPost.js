"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

/*QUILL*/
import dynamic from 'next/dynamic';
//
import 'quill/dist/quill.snow.css'; // Add css for snow theme
//import from server to client component

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

//import ReactQuill from "react-quill";


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
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


/* Next Auth */

import { useSession } from "next-auth/react";

const Tags = ['Cuisine', 'Culture', 'Ramen', 'Shinjuku']

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function NewPost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [value, setValue] = useState();
  const [title, setTitle] = useState('');
  const [publish, setPublish] = useState(false);


  const [TagList, setTagList] = useState([])

  /* QUILL */

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
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  /* PUBLISH */
  const handlePublish = (event) => {
    setPublish(event.target.value === "true" ? true : false);
  };



  /*  TAGS  */
  const handleTagChange = (event) => {

    const { target: { value } } = event;

    setTagList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );


  };


  /* POST */


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
            JSON.stringify({ title: title, email: session?.user.email, content: value, publish: publish, tag: TagList }),
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
        <Stack spacing={2} mt={2}>
          <Typography component="h1" variant="h5">
            New Post
          </Typography>

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

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={TagList}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {Tags.map((Tag) => (
                <MenuItem key={Tag} value={Tag}>
                  <Checkbox checked={TagList.indexOf(Tag) > -1} />
                  <ListItemText primary={Tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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




          <Button type="submit" onClick={submitData} variant="contained" sx={{
            mt: 2,/*mb: 2*/
          }}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Container >
  );
}

