"use client";
import * as React from 'react';

import DashboardUser from '../../components/DashboardUser';
import DashboardAdmin from '../../components/DashboardAdmin';

/*MUI*/
import Button from '@mui/material/Button';


/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"

/*Pour edit SESSION necessite modif dans type next auth et pas prisma"é */




export default function Dashboard() {

  const { data: session } = useSession();

  const role = session?.user.role;


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

