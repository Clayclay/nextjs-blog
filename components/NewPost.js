"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'


/*  TIPTAP  */
import styles from './Tiptap.module.css';
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'


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
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';


/* Next Auth */

import { useSession } from "next-auth/react";

const Tags = ['Cuisine', 'Culture', 'Ramen', 'Shinjuku']

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function NewPost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [value, setValue] = useState(); // TIP TAP AUSSI
  const [title, setTitle] = useState('');
  const [publish, setPublish] = useState(false);
  const [TagList, setTagList] = useState([])

  const [category, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  /* TIP TAP */



  const MenuBar = ({ editor }) => {
    //const { editor } = useCurrentEditor()

    if (!editor) {
      return null
    }

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}>

        <Stack spacing={1} direction="row">
          <IconButton aria-label="FormatBold" size="small"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <FormatBoldIcon />
          </IconButton>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            H4
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            H5
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            H6
          </Button>   </Stack>
        <Stack spacing={1} direction="row">
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </Button>



          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            Horizontal rule
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            Undo
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            Redo
          </Button>
          <Button variant="outlined" size="small"
            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
          >
            Purple
          </Button>
        </Stack>
      </Box >
    )
  }

  const extensions = [
    Text,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  const content = ' Tape Here'


  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: `text-editor__editor`,
      },
    },

    /**
     * This option gives us the control to enable the default behavior of rendering the editor immediately.
     */
    immediatelyRender: true,
    /**
     * This option gives us the control to disable the default behavior of re-rendering the editor on every transaction.
     */
    shouldRerenderOnTransaction: false,
    onUpdate({ editor }) {
      setValue(
        //editor.getJSON()
        editor.getHTML()
      );
    },

    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  /* FIN TIPTAP*/


  /* PUBLISH */
  const handlePublish = (event) => {
    setPublish(event.target.value === "true" ? true : false);
  };



  /*  TAGS  */
  const handleTagChange = (event) => {

    const { target: { value } } = event;

    setTagList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );


  };


  /* POST */


  async function submitData(e) {
    e.preventDefault();

    if (title && session.user) {

      try {


        const res = await fetch('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //'API-Key': process.env.DATA_API_KEY!,
          },
          body: //JSON.stringify(body),
            JSON.stringify({ title: title, email: session?.user.email, content: value, publish: publish, tag: TagList, categories: category }),
        })

        if (!res.ok) {
          console.log('Failed to fetch data')
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }

        const data = await res.json()
        console.log('reponse', data, 'data')

        // return Response.json({ data })


        alert(data.message);
        await router.push(`/posts/${data.result.id}`);

      } catch (error) {
        console.error(error);
      }


      //  });
    }
  };


  return (

    <Container maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 8 }} >
        <Stack spacing={2} mt={2}>
          <Typography component="h1" variant="h5">
            New Post
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

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="category"
              onChange={handleCategoryChange}
            >
              <MenuItem value={'Cuisine'}>Cuisine</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={TagList}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {Tags.map((Tag) => (
                <MenuItem key={Tag} value={Tag}>
                  <Checkbox checked={TagList.indexOf(Tag) > -1} />
                  <ListItemText primary={Tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          {/*<Tiptap />*/}

          <MenuBar editor={editor} />
          <Card variant="outlined" className={styles.tiptap} >


            <EditorContent editor={editor} />
          </Card>




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




          <Button type="submit" onClick={submitData} variant="contained" sx={{
            mt: 2,/*mb: 2*/
          }}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Container >
  );
}

