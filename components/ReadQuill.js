"use client";

import React, { useState } from "react";

import Postupdate from "../app/posts/[id]/postupdate.js";

/*QUILL*/
import 'quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
/*MUI*/
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import { Box } from '@mui/material/';


export default function ReadQuill(props) {

    const { post } = props;

    /*
    
        const arrTags = post.tags.map((element) => element.name)
        const [TagList, setTagList] = useState(arrTags)
    
    */

    return (

        <Stack spacing={2} mt={2} key={post.id}   >

            <Typography component="h1" variant="h5">
                {post.title}
            </Typography>


            <Box sx={{ fontStyle: 'italic' }}>
                <Typography variant="body1" gutterBottom >
                    {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
                </Typography>
            </Box>



            <ReactQuill
                theme="bubble"
                value={post.content}
                readOnly={true}
            />


        </Stack>)

}



