"use client";

import React, { useState, useCallback } from "react";
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';

/*NEXT-AUTH*/
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession();
    const isLoggedIn = session;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 5 }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Sitemark />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="text" color="info" size="small">
                                Features
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Testimonials
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Highlights
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Pricing
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                FAQ
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                Blog
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >

                        {isLoggedIn ? (
                            <Button color="primary" variant="text" size="small" href={'/dashboard'} >Dashboard</Button>
                        ) : (
                            <Button color="primary" variant="text" size="small" href={'/register'} >Subscribe</Button>
                        )}


                        {session ?

                            <Button color="primary" variant="contained" size="small" onClick={() => signOut()}  /* LinkComponent={Link}  href="/sign-in" */ >
                                Sign Out
                            </Button>

                            :

                            <Button color="primary" variant="contained" size="small" onClick={() => signIn()} /* LinkComponent={Link}  href="/sign-in" */ >
                                Sign up
                            </Button>

                        }

                    </Box>
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>Features</MenuItem>
                                <MenuItem>Testimonials</MenuItem>
                                <MenuItem>Highlights</MenuItem>
                                <MenuItem>Pricing</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                                <MenuItem>Blog</MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="contained" fullWidth>
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="outlined" fullWidth>
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}