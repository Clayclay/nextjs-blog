"use client";

import React, { useState } from "react";

import Postupdate from "../app/posts/[id]/postupdate.js";

/*  TIPTAP  */

import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import styles from './Tiptap.module.css';

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import Strike from '@tiptap/extension-strike'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

/*MUI*/
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import { Box } from '@mui/material/';


export default function ReadPost(props) {

    const { post } = props;

    console.log(post.content)

    const editor = useEditor({
        extensions: [
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
            Strike,
            Document, // required
            Paragraph,
            Text,
        ],
        immediatelyRender: true,
        shouldRerenderOnTransaction: false,
        content: post.content,

        editable: false,


    })

    /*
     
        const arrTags = post.tags.map((element) => element.name)
        const [TagList, setTagList] = useState(arrTags)
     
    */

    return (

        <Stack spacing={2} mt={2} key={post.id}   >

            <Typography component="h1" variant="h5">
                {post.title}
            </Typography>


            <Box sx={{ fontStyle: 'italic' }}>
                <Typography variant="body1" gutterBottom >
                    {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
                </Typography>
            </Box>

            <div className={styles.tiptap} >
                <EditorContent editor={editor} />
            </div >



        </Stack>)

}



