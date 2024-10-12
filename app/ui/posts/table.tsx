import Image from 'next/image';
//import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
//import InvoiceStatus from '@/app/ui/invoices/status';
//import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

//import { fetchFilteredInvoices } from '@/app/lib/data';

import prisma from '../../../lib/prisma';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import PostCardMui from './postCardMui';

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {


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
                {data?.map((post, index) => (

                    <PostCardMui post={post} index={index} />
                ))}
            </Grid>
        </>

    );
}