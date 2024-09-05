"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from 'next/navigation'


/*  TIPTAP  */
import "./Tiptap.scss";
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'

/*MUI*/
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
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
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

/*ICONS*/

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ClearIcon from '@mui/icons-material/Clear';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';

/* Next Auth */

import { useSession } from "next-auth/react";


/*  TAGS */

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


/* TOGGLEBUTTON */

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
  {
    marginLeft: -1,
    borderLeft: '1px solid transparent',
  },
}));

/*  TIPTAP MENU*/

const MenuBar = ({ editor }) => {
  //const { editor } = useCurrentEditor()
  const [height, setHeight] = React.useState(480)
  const [width, setWidth] = React.useState(640)

  if (!editor) {
    return null
  }


  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    // cancelled
    if (url === null) {
      return
    }
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()
      return
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  /*
      const addIframe = useCallback(() => {
        const url = window.prompt('URL')
  
        if (url) {
          editor.chain().focus().setIframe({ src: url }).run()
        }
      }, [editor])
  */
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      })
    }
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

      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        })}
      >
        <StyledToggleButtonGroup
          size="small"
          // value={alignment}
          exclusive
          // onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bulletList" aria-label="bulletList"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}>
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton value="orderedList" aria-label="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}>
            <FormatListNumberedIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="blockquote" aria-label="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}>
            <FormatQuoteIcon />
          </ToggleButton>
          <ToggleButton value="horizontalRule" aria-label="horizontalRule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <HorizontalRuleIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="Clearnodes" aria-label="Clearnodes"
            onClick={() => editor.chain().focus().clearNodes().run()} >
            <ClearIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        })}
      >

        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          {/*<ToggleButton value="h1" aria-label="h1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
            h1
          </ToggleButton>*/}
          <ToggleButton value="h2" aria-label="h2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
            h2
          </ToggleButton>
          <ToggleButton value="h3" aria-label="h3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
            h3
          </ToggleButton>
          <ToggleButton value="h4" aria-label="h4"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
            h4
          </ToggleButton>{/*
          <ToggleButton value="h5" aria-label="h5"
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>
            h5
          </ToggleButton>
          <ToggleButton value="h6" aria-label="h6"
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>
            h6
          </ToggleButton>*/}
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}>
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}>
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="strike" aria-label="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}>
            <FormatStrikethroughIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="FormatBold" aria-label="FormatBold"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}  >
            <FormatClearIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        })}
      >
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton          >
            <Input type="number" id="width" placeholder="width" value={width} size='small' sx={{ width: '2em', padding: '0', height: 24 }}
              onChange={event => setWidth(event.target.value)} inputProps={{ min: 320, max: 1024 }} /> {/*min= 320, max= 1024 */}
          </ToggleButton>
          <ToggleButton>
            <Input type="number" id="height" placeholder="height" value={height} size='small' sx={{ width: '2em', height: 24 }}
              onChange={event => setHeight(event.target.value)} inputProps={{ min: 180, max: 720 }} />{/* min= 180, max= 720*/}
          </ToggleButton>
          <ToggleButton value="addYoutube" aria-label="addYoutube"
            onClick={addYoutubeVideo}
          >
            <YouTubeIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton>
            <Input type="color"
              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color}
              data-testid="setColor"
              id='colorPicker'
              sx={{ width: '2em', '&::before': { borderBottom: 'none' }, height: 24 }}

            /></ToggleButton>

          <ToggleButton value="addImage" aria-label="addImage"
            onClick={addImage}          >
            <AddPhotoAlternateIcon />
          </ToggleButton>
          <ToggleButton value="setLink" aria-label="setLink" className={editor.isActive('link') ? 'is-active' : ''}
            onClick={setLink}          >
            <AddLinkIcon />
          </ToggleButton>
          <ToggleButton value="setLink" aria-label="setLink" onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            <LinkOffIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <StyledToggleButtonGroup
          size="small"
          // value={formats}
          //onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="undo" aria-label="undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
            <UndoIcon />
          </ToggleButton>
          <ToggleButton value="redo" aria-label="redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}>
            <RedoIcon />
          </ToggleButton>

        </StyledToggleButtonGroup>
      </Paper>
    </Box >

  )
}

export default function NewPost() {
  const { data: session } = useSession()
  const router = useRouter()

  const [postContent, setpostContent] = useState(); // TIP TAP AUSSI
  const [title, setTitle] = useState('');
  const [publish, setPublish] = useState(false);
  const [TagList, setTagList] = useState([])
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  /* TIP TAP */
  /*
  const CustomDocument = Document.extend({
    content: 'heading block*',
  })*/

  const extensions = [
    StarterKit
      .configure({
        heading: {
          levels: [2, 3, 4, 5]
        },
        document: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    Image.configure({
      allowBase64: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    /* 
    BulletList,
    Blockquote, 
    Bold,
    CodeBlock, 
    Dropcursor,
    HardBreak,
    Heading,Italic, Iframe, ListItem,
    OrderedList,
   Paragraph,
   Text,  
   */
    Highlight,
    Underline,
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
    Document, // ou custom si on veux formater
    /*CustomDocument,
     Placeholder.configure({
       placeholder: ({ node }) => {
         if (node.type.name === "heading") {
           return "What’s the title?";
         }
 
         return "Can you add some further context?";
       }
     }),*/
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
    }),
  ]

  const editor = useEditor({
    extensions,
    content,
    /**
     * This option gives us the control to enable the default behavior of rendering the editor immediately.
     */
    immediatelyRender: true,
    /**
     * This option gives us the control to disable the default behavior of re-rendering the editor on every transaction.
     */
    shouldRerenderOnTransaction: false,
    onUpdate({ editor }) {
      setpostContent(
        //editor.getJSON()
        editor.getHTML()
      );
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
            JSON.stringify({ title: title, email: session?.user.email, content: postContent, publish: publish, tag: TagList, categories: category }),
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

          <FormControl
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-category"
              id="select-category"
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
              labelId="demo-multiple-checkbox-tag"
              id="checkbox-Tag"
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
          {/*  */}

          <Card variant="outlined"    >
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

