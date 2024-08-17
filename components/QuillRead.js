"use client";
import React, { useState } from "react";

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


export default function QuillRead(props) {

    const { post } = props;
    console.log('post', post)

    const [content, setContent] = useState(post.content);

    return (

        <ReactQuill
            theme="bubble"
            value={content}
            readOnly={true}
        />

    )
};

