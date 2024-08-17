"use client";
import React, { useState } from "react";

/*QUILL*/
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from "react-quill";


/*  MUI */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function QuillRead(props) {

    const { post } = props;

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

                        <ReactQuill
                            theme="bubble"
                            value={post.content}
                            readOnly={true}
                        />

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

