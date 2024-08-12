"use client";

import React, { useState } from "react";



/*QUILL*/
import 'quill/dist/quill.snow.css';
import ReactQuill from "react-quill";


/*MUI*/
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function Quilledit(props) {

    const { id, post } = props;

    const [content, setContent] = useState(post.content);
    const [publish, setPublish] = useState(post.published);
    const [readOnly, setReadOnly] = useState(true);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
    ];

    const modules = {
        toolbar: {
            container: [
                [{ header: [2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ color: [] }],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
            ],
            handlers: {
                // image: imageHandler,
            },
        },
        clipboard: {
            matchVisual: true,
        },
    }


    return (

        <Container maxWidth="sm">
            <CssBaseline />
            <Box sx={{ marginTop: 8 }} >

                <Stack spacing={2} mt={2}>
                    <Typography component="h1" variant="h5">
                        {post.title}
                    </Typography>


                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        formats={formats}
                        modules={modules}
                        readOnly={readOnly}
                    />





                </Stack>

            </Box>
        </Container>
    )
};

