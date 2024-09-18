"use client";

/*  MUI */
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Postupdate(props) {

  const { id, title,
    content, publish,
    categories, tags,
    mainPosts
  } = props;

  console.log('props', props)
  async function DeletePost() {

    console.log("on va delete", id);

    const res = fetch(`/api/post?id=${id}`, {
      method: 'DELETE',
    })


    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()

  }

  async function UpdatePost() {

    try {

      const res = await fetch(`/api/post?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //'API-Key': process.env.DATA_API_KEY!,
        },
        body:
          JSON.stringify({
            title: title, content: content, published: publish,
            categories: categories, tags: tags,
            main: mainPosts
          }),
      })


      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }

      const response = await res.json()
      console.log('reponse', response, 'data')

      //return res.json()
      //alert(response.message);

    }
    catch (error) {
      console.error(error);
    }

  }
  return (


    <Box sx={{ '& button': { m: 1 } }}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={UpdatePost}>Update</Button>

        <Button variant="outlined" onClick={DeletePost}>Delete</Button>
      </Stack>
    </Box>

  )
}