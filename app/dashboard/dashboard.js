"use client";
import * as React from 'react';

/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"

import DashboardUser from '../../components/DashboardUser';
import DashboardAdmin from '../../components/DashboardAdmin';

/*MUI*/
import Button from '@mui/material/Button';

/*Pour edit SESSION necessite modif dans type next auth et pas prisma"é */


export default function Dashboard(props) {

    const { data: session } = useSession();
    const role = session?.user.role;
    const { tags, categories } = props;



    if (role === 'ADMIN') {
        return <DashboardAdmin tags={tags} categories={categories} />
    } else if (role === 'USER') {
        return <DashboardUser />
    } else {
        return <><p>You are not authorized to access this page.please log in</p>

            <Button variant="outlined" size="small" onClick={() => signIn()} /* LinkComponent={Link}  href="/sign-in" */ >
                Sign up
            </Button></>

    }
};







