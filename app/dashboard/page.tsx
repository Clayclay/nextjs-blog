"use client";
import * as React from 'react';
import { useState } from 'react';

/*MUI*/

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { mainListItems, secondaryListItems } from './listItems';
import { AppBar, Badge, Box, Button, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';



/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


export default function Dashboard() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log(session?.user)

  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />

      </>
    )
  }



  return (
    <>
      no
    </>
  )


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

}
