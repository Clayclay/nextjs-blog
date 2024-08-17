"use client";
import React from "react";

/*QUILL*/
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from "react-quill";


/*MUI*/
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';


export default function Quilledit(props) {

    const { post } = props;


    return (




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



    )
};

