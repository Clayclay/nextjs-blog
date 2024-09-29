/******  SERVER ******/
import prisma from "../../lib/prisma";


// Importer en dynamic pour coté client quand SERVER 
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('./dashboard'), { ssr: false });

import Container from '@mui/material/Container';

export default async function DashboardServer() {


  try {

    const tags = await prisma.tag.findMany();

    const categories = await prisma.category.findMany();

    return (
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Dashboard tags={tags} categories={categories} />

      </Container>

    )
  }

  catch (error) {
    return { message: 'Database Error: Failed ', };
  }

}


//










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
