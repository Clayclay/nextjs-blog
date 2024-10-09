import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

/*EXEMPLE AVEC VARIANTS */
export function Variants() {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
    );
}


export default function DashboardSkeleton() {
    return (
        <>
            <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        </>
    );
}


export function InvoicesTableSkeleton() {
    return (
        <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
            <div className="flex items-center">
                <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
                <div className="min-w-0">
                    <div className="h-5 w-40 rounded-md bg-gray-200" />
                    <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </div>
            </div>
            <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
    );
}
