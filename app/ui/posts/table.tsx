import Image from 'next/image';
//import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
//import InvoiceStatus from '@/app/ui/invoices/status';
//import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';

//import { fetchFilteredInvoices } from '@/app/lib/data';

import prisma from '../../../lib/prisma';
import { Typography } from '@mui/material';

export default async function Table({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {


    const data = await prisma.post.findMany({
        where: {
            content: { contains: query }
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
    })

    console.log('result', data)
    // const invoices = await fetchFilteredInvoices(query, currentPage);

    return (

        <>
            {data?.map((post) => (
                <Typography> {post.title} </Typography>
            ))}

        </>

    );
}