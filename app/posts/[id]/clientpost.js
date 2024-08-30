"use client";

import React, { useState } from "react";

import Postupdate from "./postupdate.js";

/*SESSION*/
/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"

import ReadPost from '../../../components/ReadPost.js';
/* TIPTAP */

import styles from '../../../components/Tiptap.module.css';
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

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

/*TAGS*/
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




export default function ClientPost(props) {

    const { data: session } = useSession();
    const role = session?.user.role;

    const { id, post } = props;
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [publish, setPublish] = useState(post.published);

    const arrTags = post.tags.map((element) => element.name)
    const [TagList, setTagList] = useState(arrTags)



    /* TIP TAP */

    const MenuBar = ({ editor }) => {
        //const { editor } = useCurrentEditor()

        if (!editor) {
            return null
        }

        return (
            <div className="control-group"        >
                <div className="button-group">
                    <button
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
                        Bold
                    </button>
                    <button
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
                    </button>
                    <button
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
                    </button>
                    <button
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
                    </button>
                    <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                        Clear marks
                    </button>
                    <button onClick={() => editor.chain().focus().clearNodes().run()}>
                        Clear nodes
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={editor.isActive('paragraph') ? 'is-active' : ''}
                    >
                        Paragraph
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        H3
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                    >
                        H4
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                    >
                        H5
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                    >
                        H6
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        Ordered list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        Code block
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        Blockquote
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        Horizontal rule
                    </button>
                    <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                        Hard break
                    </button>
                    <button
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
                    </button>
                    <button
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
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                    >
                        Purple
                    </button>
                </div>
            </div>
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
            setContent(
                //editor.getJSON()
                editor.getHTML()
            );
        }
    })

    /* FIN TIPTAP*/



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

    if (role === 'ADMIN') {
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

                        <div className={styles.tiptap} >
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} />
                        </div >


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

                        <Postupdate id={id} title={title} content={content} publish={publish} tags={TagList} />

                    </Stack>

                </Box>
            </Container>
        )



    } else if (role === 'USER') {
        return (

            <ReadPost post={post} />
        )
    } else {
        return (

            <ReadPost post={post} />

        )

    }


};

