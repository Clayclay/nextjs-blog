"use client";
import React, { useState, useCallback, useEffect } from "react";

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

import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { Button } from "@mui/material";

//import Form from 'next/form' pas encore apply
{/* ---------------------------------SEARCH-------------------------------------- */ }
import Search from '../ui/search'



export function SearchTempo() {

    /*Search*/
    const [searchInput, setSearchInput] = useState("");
    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearchInput(event.target.value)
    }

    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput

                onChange={handleSearchChange}
                value={searchInput}
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
            <Button href="/posts" target="_blank" variant="outlined">MUI Link Button</Button>
        </FormControl>
    );
}
{/* -------------------------CATEGORIES-------------------------------------------- */ }

export function filterByCategory(allPosts, categoriesFilter) {
    // const { categoriesFilter, mainPosts } = props;
    // console.log('inside function', typeof (categoriesFilter))

    if (categoriesFilter) {
        return allPosts.filter(post => post.categories?.name === categoriesFilter)
    }
    return allPosts
}


export default function ListPost(props) {

    const { categories, allPosts } = props;

    {/*-------------------------------CATHEGORIES----------------------------------- */ }
    const [categoriesFilter, setCategoriesFilter] = useState(null)
    const [filteredPosts, setFilteredPosts] = useState(allPosts)

    useEffect(() => {
        setFilteredPosts(() => filterByCategory(allPosts, categoriesFilter))
    }, [categoriesFilter]);

    const handleCategoriesClick = (event) => {
        console.info('You clicked the filter chip.', event.target.textContent);
        setCategoriesFilter(event.target.textContent)
        console.log('event', event)
    };

    const handleCategoriesReset = (event) => {
        setCategoriesFilter(null)
    };

    // console.log('result',  filteredPosts.map((element) => element)   )

    {/*------------------------SEARCH--------------------------------- */ }

    const handleSearch = (event) => {
        console.log(event);
    }


    const [placeholder, setPlaceHolder] = useState("Search invoices...")

    /*
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
        })*/


    return (

        <>

            { /*<input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />*/}

            {/* <Search placeholder={placeholder} />*/}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>


                <div>
                    <Typography variant="h1" gutterBottom>
                        Blog
                    </Typography>
                    <Typography>Stay in the loop with the latest about our products</Typography>
                </div>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', md: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'start', md: 'center' },
                        gap: 4,
                        overflow: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            flexDirection: 'row',
                            gap: 3,
                            overflow: 'auto',
                        }}
                    >
                        <Chip onClick={handleCategoriesReset} size="medium" label="All categories" />

                        {
                            categories.map(element => {
                                return (
                                    < Chip
                                        key={element.id}
                                        onClick={handleCategoriesClick}
                                        size="medium"
                                        label={element.name}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }}
                                    />
                                )

                            })}

                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'row',
                            gap: 1,
                            width: { xs: '100%', md: 'fit-content' },
                            overflow: 'auto',
                        }}
                    >
                        {/*<Search />*/}
                        <IconButton size="small" aria-label="RSS feed">
                            <RssFeedRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/*
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
*/}


        </>
    )
};

