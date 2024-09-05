"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import { Box } from '@mui/material/';



/* TIPTAP*/
import ReadPost from './ReadPost';

function Main(props) {

  const { posts, title } = props;
  const PostArray = posts.sort((a, b) => a.createdAt - b.createdAt)

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


          <ReadPost post={post} key={post.id} />


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









