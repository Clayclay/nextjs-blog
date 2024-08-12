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



export default function Quilledit(props) {

    const { post } = props;


    return (

        <Container maxWidth="sm">
            <CssBaseline />
            <Box sx={{ marginTop: 8 }} >

                <Stack spacing={2} mt={2}>
                    <Typography component="h1" variant="h5">
                        {post.title}
                    </Typography>



                    <ReactQuill
                        theme="bubble"
                        value={post.content}
                        readOnly={true}
                    />



                </Stack>

            </Box>
        </Container>
    )
};

