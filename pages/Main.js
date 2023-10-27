import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

//import Markdown from './Markdown';
import Markdown from 'markdown-to-jsx'
import { useState } from 'react';

function Main(props) {


  const { posts, title } = props;

  const [custom, setCustom] = useState([]);


  //console.log('main', typeof posts , props )

  //const test = posts.toString()

  //console.log('test', typeof test, test )
  
  //console.log("posts",posts)

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


      


      {
      posts.map((post,index) => (
   
        <Markdown  className="markdown"  key={index}>
        {post}
        </Markdown>

   ))
   }


  

      
    </Grid>
  );
}



/* 


      {posts.map((post) => (
        console.log("post", typeof post.content )
   ))}
      {posts.map((post) => (
        
    
        <Markdown  className="markdown" key={post.id}>
        {post.content}
        </Markdown>
      ))}
 
      {posts.map((post) => (
        
    
  <Markdown  className="markdown" key={post.id}>
  {post.content}
  </Markdown>
))}






      {posts.map((post) => (
<Markdown  className="markdown" key={post.id}>
{post.content}
</Markdown>
))}



*/


Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;









     