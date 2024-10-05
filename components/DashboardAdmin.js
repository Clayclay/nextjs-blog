"use client";
import React, { useState, useCallback, useEffect } from "react";
import NewPost from './NewPost';
import Link from '@mui/material/Link';



/*  MUI */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



export default function DashboardAdmin(props) {

    const { tags, categories, posts } = props;

    //"ADMIN"
    return (
        <>
            <Link href="/posts">List Posts</Link>
            <NewPost tags={tags} categories={categories} />

            {posts.map((post) => (


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



            ))}


        </>


    );
}

