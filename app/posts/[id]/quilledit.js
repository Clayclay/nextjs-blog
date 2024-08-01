"use client";

import React,{ useCallback, useMemo, useRef, useState , useEffect } from "react";

/*QUILL*/
import dynamic from 'next/dynamic';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
const quill = dynamic(() => import('react-quill'), { ssr: false });


/*MUI*/
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';


import ReactQuill, { Quill } from 'react-quill';

export default function Quilledit(props){

    const {postContent} = props;

    console.log('postcontent',postContent)

    const [value, setValue] = useState(postContent);
    const { quill, quillRef } = useQuill();
    //const [content, setContent] = useState('');

    console.log('value',value)

    React.useEffect(()  =>  {

        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
            //  console.log('Text change!');
            //  console.log(quill.getText()); // Get text only
            //  console.log("delta content" ,quill.getContents()); // Get delta contents
            //  console.log(quill.root.innerHTML); // Get innerHTML using quill
            //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
           
            setContent(quill.getContents());
          
          });
        }
    }, [quill, value]);


    return(
        
        <div>
        <Box sx={{  mt:2 }} >
     

        </Box>
        Page client pour invoquer quill en client :

        <ReactQuill  theme="snow" value={value} onChange={setValue} />
</div>


    
    )


}


/*
 <div ref={quillRef}
        //defaultValue={content}   
        //value={value} onChange={setValue} 
       />
       
       */