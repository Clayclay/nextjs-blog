"use client";
import React, { useState } from "react";

/*  TIPTAP  */
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import "../../components/Tiptap.scss";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import Strike from '@tiptap/extension-strike'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import ReadPost from "../../components/ReadPost";

/*  MUI */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function ListPost(props) {

    const { post } = props;

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


    return (

        <Grid item xs={12} sx={{ marginTop: 1 }} key={post.id} spacing={2}>
            <CardActionArea component="a" href={"/posts/" + post.id} >
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>



                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.date}
                        </Typography>



                        {post.content}



                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block', margin: 10 } }}
                        image={post.image}
                        alt={post.imageLabel}

                    />
                </Card>
            </CardActionArea>

        </Grid>




    )
};

