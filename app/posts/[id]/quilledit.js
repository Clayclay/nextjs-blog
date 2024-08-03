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
import ReactQuill, { Quill } from "react-quill";


/*MUI*/

import Box from '@mui/material/Box';




export default function Quilledit(props) {

    const { id, post } = props;

    const [value, setValue] = useState(post.content);



    return (

        <div>
            <Box sx={{ mt: 2 }} >
                Le client pour invoquer quill en client :


            </Box>


            <ReactQuill theme="snow" value={value} onChange={setValue} />

            <Postupdate id={id} post={post} /* content={content}*/ />
        </div>


    )
};

