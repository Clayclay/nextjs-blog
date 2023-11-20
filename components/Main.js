import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

//import Markdown from './Markdown';
import Markdown from 'markdown-to-jsx'

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { Button , Link } from '@mui/material';


function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}

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

    
      { posts.map((post,index) => (
        <div key={post.id}>
          <Markdown  className="markdown"   >
            {post.content.toString()}
          </Markdown>  
          <Typography variant="subtitle1" color="primary">
          <Link alignItems="center" href={`/posts/${post.id}`} >Continue reading...</Link>
        </Typography>
        </div>

      )) }

    </Grid>
  );
}

Main.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  posts : PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  
};

export default Main;









     