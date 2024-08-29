"use client";

import React, { useState } from "react";

import Postupdate from "./postupdate.js";

/*SESSION*/
/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"


/*QUILL*/
import 'quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

import ReadPost from '../../../components/ReadPost.js';

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


    // console.log('arr', TagList.map((element) => element.name))
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video'];

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ],

        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];



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
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            formats={formats}
                            modules={modules}
                        />

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

