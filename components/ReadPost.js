"use client";

import React, { useState } from "react";

import Postupdate from "../app/posts/[id]/postupdate.js";

/*  TIPTAP  */

import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import "./Tiptap.scss";

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
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material/';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function ReadPost(props) {

    const { post } = props;

    const editor = useEditor({
        extensions: [
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

            <Link href={"/posts/" + post.id} sx={{
                color: 'black',
                textDecoration: 'none',
                display: 'inline'
            }}>
                <Typography component="h1" variant="h5">
                    {post.title}
                </Typography>
            </Link>


            <Box sx={{ fontStyle: 'italic' }}>
                <Typography variant="body1" gutterBottom >
                    {new Date(post.createdAt).toLocaleDateString()} by {post.author.name}
                </Typography>
            </Box>


            <Paper elevation={0} sx={{}} >

                <EditorContent editor={editor} />
            </Paper>


            <Divider />

        </Stack>



    )

}



