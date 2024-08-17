"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

/*QUILL*/
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from "react-quill";

function Main(props) {

  const { posts, title } = props;

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

      {posts.map((post, index) => (

        <Stack spacing={2} mt={2}>



          <Link href={"/posts/" + post.id} sx={{
            color: 'black',
            textDecoration: 'none',
            display: 'inline'
          }}>
            <Typography component="h1" variant="h5">
              {post.title}
            </Typography>
          </Link>


          <ReactQuill
            theme="bubble"
            value={post.content}
            readOnly={true}
          />


        </Stack>


      ))}



    </Grid>
  );
}

Main.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  posts: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,

};

export default Main;









