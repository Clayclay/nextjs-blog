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

          <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Stack direction="row" spacing={1}>
                {post.tags.map((tag, index) => (

                  <Chip label={tag.name} key={tag.id} />

                )
                )}
              </Stack>

              {/* 
              <Typography gutterBottom variant="caption" component="div" key={index} display='inline' >
                {tag.name}
              </Typography>*/}

              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >

                <Link href={"/posts/" + post.id} sx={{
                  color: 'black',
                  textDecoration: 'none',
                  display: 'inline'
                }}>
                  {post.title}
                </Link>
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {post.description}
              </StyledTypography>

              {/* <Author authors={article.authors} />  */}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
                >
                  {/*<AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>*/}
                  <Typography variant="caption">
                    {/*authors.map((author) => author.name).join(', ')*/}
                    {post.author.name}
                  </Typography>
                </Box>
                <Typography variant="caption">  {new Date(post.createdAt).toLocaleDateString()}  </Typography>
              </Box>


            </Box>
          </Grid>
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









