"use client";
import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import PostCardMui from "../app/ui/posts/postCardMui";

/*  NAVIGATION  */

import usePagination from "./Pagination";

/* TIPTAP */
import ReadPost from './ReadPost';
import NextAuthSessionProvider from "../providers/SessionProvider";

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));




function Main(props) {

  const { posts, title } = props;
  console.log('est ce,bon ', posts)
  //const PostArray = posts.sort((a, b) => a.createdAt - b.createdAt)

  const [focusedCardIndex, setFocusedCardIndex] = useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  /*  NAVIGATION  */

  const [allPosts] = useState(posts /*PostArray.reverse()*/);


  // const [isLoading, setIsLoading] = useState(false);
  //const [currentPage, setCurrentPage] = useState(1);
  //const indexOfLastPost = currentPage * postsPerPage;
  //const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  //const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //const totalPosts = allPosts.length


  /* MUI*/
  const [page, setPage] = React.useState(1);
  const [postsPerPage] = useState(10);
  const count = Math.ceil(allPosts.length / postsPerPage);  // const pageNumbers = Math.ceil(totalPosts / postsPerPage);
  const PaginationAllPosts = usePagination(allPosts, postsPerPage);

  const handleChange = (e, p) => {
    setPage(p);
    PaginationAllPosts.jump(p);
  };




  return (

    <div>

      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {/* Pour appliquer pagination sur le array ajouter .currentData()*/}
        {PaginationAllPosts.currentData().map((post, index) => (


          <PostCardMui post={post} index={index} />



        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>


        <Pagination hidePrevButton hideNextButton count={count} page={page} onChange={handleChange} />


        {/*<Pagination hidePrevButton hideNextButton count={10} boundaryCount={10}  />
 */ }

      </Box>


      {/*
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >

      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />

      {PostArray.reverse().map((post) => {
        //console.log(post),
        // console.log('date', new Date(post.createdAt).toString()),
        return (


          <ReadPost post={post} key={post.id} />


        )
      })}

    </Grid>   */}

    </div>
  );
}

Main.propTypes = {
  //posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  posts: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,

};

export default Main;









