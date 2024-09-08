"use client";

import React, { useState } from "react";

import Postupdate from "../app/posts/[id]/postupdate.js";

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
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LinkMui from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material/';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function ReadPost(props) {

    const { post } = props;


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
        Highlight,
        Underline,
        Youtube.configure({
            controls: false,
            nocookie: true,
        }),
        Document,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
        }),
    ]

    const editor = useEditor({
        extensions,
        content: post.content,
        immediatelyRender: true,
        shouldRerenderOnTransaction: false,
        editable: false, // Important

    })

    /*
        const arrTags = post.tags.map((element) => element.name)
        const [TagList, setTagList] = useState(arrTags)
    */

    return (

        <Stack spacing={2} mt={2} key={post.id}   >

            <LinkMui href={"/posts/" + post.id} sx={{
                color: 'black',
                textDecoration: 'none',
                display: 'inline'
            }}>
                <Typography component="h1" variant="h5">
                    {post.title}
                </Typography>
            </LinkMui>


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



