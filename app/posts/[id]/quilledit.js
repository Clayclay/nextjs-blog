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
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';



export default function Quilledit(props) {

    const { id, post } = props;

    /*
    const { quill, quillRef } = useQuill();

    console.log(quill);    // undefined > Quill Object
    console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }


    
    const { quill, quillRef } = useQuill({
        formats: [
            'bold', 'italic', 'underline', 'strike',
            'align', 'list', 'indent',
            'size', 'header',
            'link', 'image', 'video',
            'color', 'background',
            //'clean',
        ],

    });

    const quillRef = useRef();
*/
    //const { data: session } = useSession();
    //const [title, setTitle] = useState('');
    const [value, setValue] = useState(post.content);

    //const [content, setContent] = useState('');

    // console.log('value',value)
    //console.log('post',post, id )
    /* 
   React.useEffect(() => {

       if (ReactQuill) {
           ReactQuill.on('text-change', (delta, oldDelta, source) => {
               console.log('Text change!');
               console.log(quill.getText()); // Get text only
               console.log("delta content", quill.getContents()); // Get delta contents
               console.log(quill.root.innerHTML); // Get innerHTML using quill
               console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef


               setContent(quill.getContents());

           });
       }
   }, [ReactQuill]);

   //if (quill) { console.log("quill root inner", !quill.root.innerHTML); }

   */

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

