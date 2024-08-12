"use client";
import * as React from 'react';
import { useState } from 'react';

import DashboardUser from '../../components/DashboardUser';
import DashboardAdmin from '../../components/DashboardAdmin';

/*MUI*/

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { mainListItems, secondaryListItems } from './listItems';
import { AppBar, Badge, Box, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"

/*Pour edit SESSION necessite modif dans type next auth et pas prisma"é */

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


export default function Dashboard() {

  const { data: session } = useSession();

  const role = session?.user.role;


  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log('role', role)


  if (role === 'ADMIN') {
    return <DashboardAdmin />
  } else if (role === 'USER') {
    return <DashboardUser />
  } else {
    return <><p>You are not authorized to access this page.please log in</p>

      <Button variant="outlined" size="small" onClick={() => signIn()} /* LinkComponent={Link}  href="/sign-in" */ >
        Sign up
      </Button></>

  }
};





/*

return (

  <div>


    <Box sx={{ display: 'flex' }} >



      <Drawer variant="permanent" open={open}   >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],

          }}




        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>

    </Box>


  </div>
);*/

