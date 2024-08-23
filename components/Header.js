"use client";

import * as React from 'react';


/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"

/*MUI*/
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';
import { Toolbar, Typography, Container, Grid, Box } from '@mui/material';



export const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];



function Header(props) {
  const { data: session } = useSession();
  const { title } = props;

  const isLoggedIn = session;


  /* Menu List */


  return (
    <React.Fragment>

      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between' }}>


        {isLoggedIn ? (
          <Button size="small" href={'/dashboard'} >Dashboard</Button>
        ) : (
          <Button size="small" href={'/register'} >Subscribe</Button>
        )}


        <Link href="/"
          sx={{
            color: 'black',
            textDecoration: 'none',
            display: 'inline'
          }}>

          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{
              flex: 1,
            }}
          >
            {title}
          </Typography>
        </Link>


        <div>
          <IconButton>
            <SearchIcon />
          </IconButton>

          {session ?

            <Button variant="outlined" size="small" onClick={() => signOut()}  /* LinkComponent={Link}  href="/sign-in" */ >
              Sign Out
            </Button>

            :

            <Button variant="outlined" size="small" onClick={() => signIn()} /* LinkComponent={Link}  href="/sign-in" */ >
              Sign up
            </Button>

          }</div>


      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>

    </React.Fragment>
  );
}

/*
Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};*/

export default Header;
