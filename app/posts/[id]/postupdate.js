"use client";

/*  MUI */ 
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

export default function Postupdate (props){

  const {id , post , content } = props;

  /*const title = post.title;
  const content = post.content;*/

    async function DeletePost(){

      console.log("on va delete" , id );
  
      const res =  fetch(`/api/post?id=${id}`, {
        method: 'DELETE',
      })
          
        
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
 
      return res.json()  
        
    }

    async function UpdatePost(){

      console.log("on va Update" , id );
  
      const res =  fetch(`/api/post?id=${id}`, {
            method: 'EDIT',
            //headers: { 'Content-Type': 'application/json',  
              //'API-Key': process.env.DATA_API_KEY!,
             // },
            body: 
              JSON.stringify({ /*title: post.title , email: session?.user.email , */ content : content}),
      })

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
 
      return res.json()  
          
        
    }


    return (
        
        <div>
        <Button variant="contained" onClick={ UpdatePost }>Update</Button>
            
        <Button variant="outlined"  onClick={ DeletePost }>Delete</Button>
         
         </div>
    )
}