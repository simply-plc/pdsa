import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import http from '../../http';
import {useState} from 'react';


import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';




export default function UserNavbar({handleToggleSidebar, decodedToken}) {

    ///////////////
    // Container //
    ///////////////

    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    function handleClickLogo() {
        if (location.pathname !== '/0') {
            navigate('/0');
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    function handleLogout() {
        http.post('/user/logout/', {
                refresh_token:localStorage.getItem('refresh_token')
            }, 
        )
        .then(response => {
            localStorage.clear();
            navigate('/login');
        })
        .catch(error => console.log(error.message));
    }

    function handleOpenMenu({currentTarget}) {
        setAnchorEl(currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            <AppBar
                position='fixed'
                color='delftBlue'
                sx={{
                    boxShadow:0,
                    width:'100vw',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                >
                <Container 
                    disableGutters
                    maxWidth='xl'
                    >
                    <Toolbar
                        variant={'dense'}
                        disableGutters
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                        >
                        {/* Start */}
                        <Stack
                            direction='row'
                            spacing={1}
                            sx={{
                                marginLeft:1,
                                width:'33%'
                            }}
                            >
                            {/* Start */}
                            <Stack
                                direction='row'
                                spacing={1}
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                }}
                                >
                                {/* Menu toggle */}
                                <IconButton onClick={handleToggleSidebar} color='primary' >
                                    <MenuRoundedIcon sx={{color:'delftBlue.contrastText'}} />
                                </IconButton>
                                {/* Logo */}
                                <Box
                                    onClick={handleClickLogo}
                                    sx={{
                                        display:'flex',
                                        cursor:'pointer',
                                    }}
                                    >
                                    <BarChartRoundedIcon color='primary'  />
                                    <Box
                                        sx={{
                                            fontWeight:'bold'
                                        }}
                                        >
                                        SimplyPLC
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                        {/* Search */}
                        <Box>
                            <TextField
                                sx={{
                                    "& fieldset": { 
                                        border: 'none',
                                    },
                                }}
                                InputProps={{
                                    sx:{
                                        backgroundColor:'delftBlue.light',
                                        borderRadius:999,
                                        height:'2rem',
                                        width:'30rem',
                                        color:'delftBlue.contrastText'
                                    },
                                    startAdornment: <SearchIcon fontSize='small' sx={{color:'background.paper'}} />
                                }}
                                placeholder='Search'
                                />
                        </Box>
                        {/* End */}
                        <Stack
                            direction='row'
                            spacing={1}
                            sx={{
                                marginRight:1,
                                justifyContent:'right',
                                width:'33%',
                            }}
                            >
                            <Box>
                                <IconButton color='primary' onClick={handleOpenMenu}>
                                    <Avatar 
                                        sx={{
                                            backgroundColor:'primary.main',
                                            width:'2rem',
                                            height:'2rem',
                                            fontSize:'1rem',
                                            color:'text.primary'
                                        }}
                                        >
                                        {decodedToken.email?.substring(0,2)}
                                    </Avatar>
                                </IconButton>
                                <Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu} >
                                    <MenuItem onClick={handleLogout} >Log out</MenuItem>
                                </Menu>
                            </Box>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}