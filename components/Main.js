"use client";
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


//import Markdown from 'markdown-to-jsx'


import MainPost from './MainPost';

function Main(props) {


  const { posts, title } = props;


  console.log('mainproblm', posts)

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
        <MainPost post={post} key={post.id} />
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









