"use client";

import React, { useState } from "react";

import Postupdate from "./postupdate.js";

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
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [publish, setPublish] = useState(post.published);
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
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
        ],
    };

    const handlePublish = (event) => {
        setPublish(event.target.value === "true" ? true : false);
    };


    return (

        <Container maxWidth="sm">
            <CssBaseline />
            <Box sx={{ marginTop: 8 }} >

                <Stack spacing={2} mt={2}>
                    <Typography component="h1" variant="h5">
                        Edit Post
                    </Typography>

                    <TextField
                        required
                        fullWidth
                        //variant="standard"
                        variant="outlined"
                        margin="normal"
                        label="Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        sx={{ mt: 4 }}
                    />

                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        formats={formats}
                        modules={modules}
                    />

                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={publish}
                            onChange={handlePublish}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="publish" />
                            <FormControlLabel value={false} control={<Radio />} label="unpublish" />
                        </RadioGroup>
                    </FormControl>

                    <Postupdate id={id} title={title} content={content} publish={publish} />

                </Stack>

            </Box>
        </Container>
    )

};

