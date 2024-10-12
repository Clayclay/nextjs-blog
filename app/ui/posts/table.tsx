import Image from 'next/image';
//import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
//import InvoiceStatus from '@/app/ui/invoices/status';
//import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

//import { fetchFilteredInvoices } from '@/app/lib/data';

import prisma from '../../../lib/prisma';

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

import * as React from 'react';


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



export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };



    const data = await prisma.post.findMany({
        where: {

            OR: [
                {
                    content: { contains: query }
                },
                {
                    title: { contains: query }
                },
            ]

            /*
                  email: {
                    endsWith: 'prisma.io',
                    mode: 'insensitive', // Default value: default
                  },
                  name: {
                    equals: 'Archibald', // Default mode
                  },*/

        },
        orderBy: { createdAt: 'desc' },
        include: {
            //published: { select: true },
            author: {
                select: { name: true, image: true },
            },
            tags: {},
            categories: {},
        },
    })

    console.log('result', data)
    // const invoices = await fetchFilteredInvoices(query, currentPage);

    return (

        <>
            <Typography variant="h2" gutterBottom>
                Result
            </Typography>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {data?.map((post) => (


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
                            {/*
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
                            </TitleTypography>}

                            {/**/}  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
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
                                        {post.author?.name}
                                    </Typography>
                                </Box>
                                <Typography variant="caption">  {new Date(post.createdAt).toLocaleDateString()}  </Typography>
                            </Box>


                        </Box>
                    </Grid>




                ))}
            </Grid>
        </>

    );
}