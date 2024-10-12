

import prisma from '../../lib/prisma';

/*  MUI */

//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

{/* ---------------------------------SEARCH-------------------------------------- */ }
import Search from '../ui/search'
import { Suspense } from 'react';
import InvoicesTableSkeleton from '../ui/skeletons'
import Table from '../ui/posts/table'


import dynamic from 'next/dynamic';
//const ListPost = dynamic(() => import('./ListPostTEMPO.js/index.js'), { ssr: false });


const allPosts = await prisma.post.findMany({
  where: {
    published: true,
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
});

const categories = await prisma.category.findMany()


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {


  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >

        <Search placeholder="Search invoices..." />


        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}
        >
          <Table query={query} currentPage={currentPage} />

        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>

      </Container>

    </Box>


  )
}

