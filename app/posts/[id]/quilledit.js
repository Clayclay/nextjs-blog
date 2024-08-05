"use client";

import React, { useState } from "react";

import Postupdate from "./postupdate.js";

/*QUILL*/

//import dynamic from 'next/dynamic';
//import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
//const Quill = dynamic(() => import('react-quill'), { ssr: false });
import ReactQuill from "react-quill";


/*MUI*/

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



export default function Quilledit(props) {

    const { id, post } = props;
    const [title, setTitle] = useState(post.title);

    const [content, setContent] = useState(post.content);

    const [publish, setPublish] = useState(post.published);

    const handlePublish = (event) => {
        setPublish(event.target.value === "true" ? true : false);
    };




    return (

        <div>
            <Box sx={{ mt: 2 }} >
                Le client pour invoquer quill en client :


            </Box>

            <TextField
                required
                fullWidth
                variant="standard"
                label="title"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                sx={{ mt: 4 }}

            />


            <ReactQuill theme="snow" value={content} onChange={setContent} />

            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Publish</FormLabel>
                <RadioGroup
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
        </div>


    )
};

