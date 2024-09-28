"use client";
import React, { useState, useCallback } from "react";
import Postupdate from "./postupdate.js";

/*SESSION*/
/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"

import ReadPost from '../../../components/ReadPost.js';
/* TIPTAP */
import "../../../components/Tiptap.scss";
import { useEditor, EditorContent } from "@tiptap/react";
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
import Link from '@tiptap/extension-link'
import FileHandler from '@tiptap-pro/extension-file-handler'

/*MUI*/

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
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

import MenuBar from '../../../components/MenuBarTiptap'


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
/* MUI IMG UPLOAD */
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});




export default function ClientPost(props) {

    const { data: session } = useSession();
    const role = session?.user.role;

    const { id, post } = props;
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [postContent, setpostContent] = useState(post.content);
    const [publish, setPublish] = useState(post.published);

    /*  TAGS */
    const { tags, categories } = props;
    const arrTags = post.tags.map((element) => element.name)
    const [TagList, setTagList] = useState(arrTags)

    const [checkedMainPosts, setCheckedMainPosts] = useState(post.main);

    const [imgBlob, setImgBlob] = useState();
    const [image, setImage] = useState();



    /*CATEGORIES*/
    //const arrCathegories = post.categories.map((element) => element.name)

    const [category, setCategory] = useState(post.categories?.name);

    console.log(' post', post.categories?.name, typeof post.categories)

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
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
        }),
        FileHandler.configure({
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
            onDrop: (currentEditor, files, pos) => {
                files.forEach(file => {
                    const fileReader = new FileReader()

                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                        currentEditor.chain().insertContentAt(pos, {
                            type: 'image',
                            attrs: {
                                src: fileReader.result,
                            },
                        }).focus().run()
                    }
                })
            },
            onPaste: (currentEditor, files, htmlContent) => {
                files.forEach(file => {
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        console.log(htmlContent) // eslint-disable-line no-console
                        return false
                    }

                    const fileReader = new FileReader()

                    fileReader.readAsDataURL(file)
                    fileReader.onload = () => {
                        currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                            type: 'image',
                            attrs: {
                                src: fileReader.result,
                            },
                        }).focus().run()
                    }
                })
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
    /* CheckBox MainPosts */


    const handleChangeMainPosts = (event) => {
        setCheckedMainPosts(event.target.checked);
    };

    /* IMG UPLOAD */

    function handleImgChange(e) {
        //console.log(e.target.files);
        //setFile(URL.createObjectURL(e.target.files[0]);
        setImgBlob(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }




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

                        {imgBlob ? <img src={imgBlob} /> : <img src={"/uploads/" + post.image} alt="Post Image" />}

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Illustration Image
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleImgChange}
                                multiple
                            />
                        </Button>






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
                                {categories.map((category) => (
                                    <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
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
                                {tags.map((Tag) => (
                                    <MenuItem key={Tag.name} value={Tag.name}>
                                        <Checkbox checked={TagList.indexOf(Tag.name) > -1} />
                                        <ListItemText primary={Tag.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/*<Tiptap />*/}

                        <MenuBar editor={editor} />
                        <Card variant="outlined" sx={{ p: 2 }} >
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


                        <FormControlLabel control={<Checkbox checked={checkedMainPosts} onChange={handleChangeMainPosts} />} label="MainPosts" />


                        <Postupdate id={id} title={title}
                            content={content} publish={publish}
                            categories={category} tags={TagList}
                            mainPosts={checkedMainPosts} image={image}
                        />

                    </Stack>

                </Box>
            </Container >
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

