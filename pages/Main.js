import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';



function Main(props) {
  const { posts, title } = props;


  //console.log("posts",posts[1].object.prototype)

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


      {posts.map((post) => (

<div>
<li> {post.title} </li>
 id : {post.id} <br />
 date : {post.date} <br />
   <br />

</div>

     ))}
   

    </Grid>
  );
}



/* 



      {posts.map((post) => (

 {post}
      
 <Markdown className="markdown" key={post.substring(0, 40)}>
 {post}
</Markdown>
      ))}
*/


Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;









     