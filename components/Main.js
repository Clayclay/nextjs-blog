"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import { Box } from '@mui/material/';

/*QUILL*/
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from "react-quill";

function Main(props) {

  const { posts, title } = props;

  const PostArray = posts.sort((a, b) => a.createdAt - b.createdAt)

  console.log(PostArray)

  return (
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
        {title}
      </Typography>
      <Divider />

      {PostArray.reverse().map((post) => {

        //console.log(post),

        // console.log('date', new Date(post.createdAt).toString()),

        return (

          <Stack spacing={2} mt={2} key={post.id}   >

            <Link href={"/posts/" + post.id} sx={{
              color: 'black',
              textDecoration: 'none',
              display: 'inline'
            }}>
              <Typography component="h1" variant="h5">
                {post.title}
              </Typography>
            </Link>


            <Box sx={{ fontStyle: 'italic' }}>
              <Typography variant="body1" gutterBottom >
                {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
              </Typography>
            </Box>


            <ReactQuill
              theme="bubble"
              value={post.content}
              readOnly={true}
            />


          </Stack>


        )
      })}



    </Grid>
  );
}

Main.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  posts: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,

};

export default Main;









