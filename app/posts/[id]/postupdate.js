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

  const {id} = props;

    async function DeletePost(){

        console.log("on va delete" , id );
  
        try {
          const response =  fetch(`/api/post?id=${id}`, {
            method: 'DELETE',
          })
          
          if (response.ok) {
            const responseData = await response.json();
            console.log('deleteSupabaseItem - ResponseOK - data deleted', responseData);
          } else {
            // Handle the error
            const responseData = await response.json();
            console.log('deleteSupabaseItem - Response not OK', responseData);
          }
        } catch (error) {
          const responseData = await response.json();
          console.log('deleteSupabaseItem - try/catch error', responseData);
          console.error('deleteSupabaseItem - try/catch error - error', error);
        }
  
      }

      async function UpdatePost(){

        console.log("on va Update" , id );
  
        try {
  
          const response =  fetch(`/api/post?id=${id}`, {
            method: 'EDIT',
            headers: { 'Content-Type': 'application/json',  
              //'API-Key': process.env.DATA_API_KEY!,
              },
            body: 
              JSON.stringify({ title: title , email: session?.user.email ,  content :quill.root.innerHTML}),
          })
          
          if (response.ok) {
            const responseData = await response.json();
            console.log('editSupabaseItem - ResponseOK - data Edit', responseData);
          } else {
            // Handle the error
            const responseData = await response.json();
            console.log('editSupabaseItem - Response not OK', responseData);
          }
        } catch (error) {
          const responseData = await response.json();
          console.log('editSupabaseItem - try/catch error', responseData);
          console.error('editSupabaseItem - try/catch error - error', error);
        }
  
      }


    return (
        
        <div>
        <Button variant="contained" onClick={ UpdatePost }>Update</Button>
            
        <Button variant="outlined"  onClick={ DeletePost }>Delete</Button>
         
         </div>
    )
}