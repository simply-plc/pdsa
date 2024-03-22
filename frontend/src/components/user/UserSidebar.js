import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {useState, useMemo} from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';





export default function UserSidebar({open}) {

    ///////////////
    // Container //
    ///////////////

    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(0);

    function handleClickLogo() {
        if (location.pathname !== '/') {
            navigate('/');
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    ///////////////
    // Component //
    ///////////////

    const CustomListButton = useMemo(() => styled(ListItemButton)(({ theme }) => ({
        '&.Mui-selected':{
            backgroundColor:theme.palette.delftBlue.light,
            '&:hover':{
                backgroundColor:theme.palette.delftBlue.dark,
            }
        },
        '&:hover':{
            backgroundColor:theme.palette.delftBlue.dark,
        }
    })), []);

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width:open ? '15rem' : '3rem',
                    transition: 'width ease .3s',
                    flexShrink:0,
                    overflow:'hidden',
                }}
                PaperProps={{
                    sx:{
                        width:open ? '15rem' : '3rem',
                        transition: 'width ease .3s',
                        bgcolor: 'delftBlue.main',
                        overflow:'hidden',
                    }
                }}
                >
                {/* This is for spacing */}
                <Toolbar variant='dense' />
                {/* Drawer Content */}
                <Box
                    sx={{
                        width:'15rem',
                        overflow:'hidden',
                    }}
                    >
                    {/* Divider */}
                    <Divider sx={{backgroundColor:'delftBlue.light'}} />
                    {/* Main Nav */}
                    <List
                        sx={{
                            color:'delftBlue.contrastText',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                        >
                        {/* Home */}
                        <CustomListButton
                            component={RouterLink}
                            to='home'
                            disableGutters
                            selected={selected === 0}
                            onClick={()=>setSelected(0)}
                            >
                            <HomeRoundedIcon 
                                sx={{
                                    marginLeft:'.75rem',
                                    marginRight:'.75rem',
                                }}
                                /> 
                            Home
                        </CustomListButton>
                        {/* Something else */}
                        <CustomListButton
                            component={RouterLink}
                            to='tasks'
                            disableGutters
                            selected={selected === 1}
                            onClick={()=>setSelected(1)}
                            >
                            <TaskAltRoundedIcon 
                                sx={{
                                    marginLeft:'.75rem',
                                    marginRight:'.75rem',
                                }}
                                /> 
                            Tasks
                        </CustomListButton>
                        {/* Something else */}
                        <CustomListButton
                            component={RouterLink}
                            to='inbox'
                            disableGutters
                            selected={selected === 2}
                            onClick={()=>setSelected(2)}
                            >
                            <NotificationsNoneRoundedIcon 
                                sx={{
                                    marginLeft:'.75rem',
                                    marginRight:'.75rem',
                                }}
                                /> 
                            Inbox
                        </CustomListButton>
                        {/* Divider */}
                        <Divider sx={{backgroundColor:'delftBlue.light'}} />
                    </List>
                </Box>
            </Drawer>
        </>
    );
}