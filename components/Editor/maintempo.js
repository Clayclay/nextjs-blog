// components/Editor/main.js

// Importing helper modules
import { Component, useCallback, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import styles from './styles.modules.css'



//MUI
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import "react-quill/dist/quill.snow.css";
 function Editor()  {
  // Editor state
  const [value, setValue] = useState("");

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  function handler(event) {
    
  
    console.log("getitle", title, 'value', value)
  }

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
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
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

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

  return (
    

<Container maxWidth="sm">
<CssBaseline />
  <Box sx={{ marginTop: 8  }} >
    <Typography component="h1"  variant="h5">
      Editor Content
    </Typography>

    <TextField
          required
          fullWidth
          variant="standard"

          label="title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}

          sx={{ mt: 4 }} 
         
    />

    <Box sx={{  mt:2 }}    >
      <QuillEditor
        ref={(el) => (quill.current = el)}
        //className={styles.editor}
        //style={ {marginTop: 2}}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      /> 
      </Box>
      
      
    <Button  type="submit" onClick={handler} variant="contained" sx={{ mt: 2,/*mb: 2*/ }}>
        Submit
    </Button>
      
  </Box>
</Container>

  );
};

export default Editor;