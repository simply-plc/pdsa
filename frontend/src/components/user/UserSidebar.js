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
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ListItemText from '@mui/material/ListItemText';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';


export default function UserSidebar({open, team}) {

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
            backgroundColor:theme.palette.custom2.light,
            '&:hover':{
                backgroundColor:theme.palette.custom2.dark,
            }
        },
        '&:hover':{
            backgroundColor:theme.palette.custom2.dark,
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
                        bgcolor: 'custom2.main',
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
                        flexGrow:1,
                        display:'flex',
                        flexDirection:'column',
                    }}
                    >
                    {/* Divider */}
                    <Divider sx={{backgroundColor:'custom2.light'}} />
                    {/* Main Nav */}
                    <List
                        sx={{
                            color:'custom2.contrastText',
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
                            to='plans'
                            disableGutters
                            selected={selected === 2}
                            onClick={()=>setSelected(2)}
                            >
                            <DashboardRoundedIcon 
                                sx={{
                                    marginLeft:'.75rem',
                                    marginRight:'.75rem',
                                }}
                                /> 
                            Plans
                        </CustomListButton>
                    </List>
                    {/* Divider */}
                    <Divider sx={{backgroundColor:'custom2.light'}} />
                    {/* Team Nav */}
                    <List
                        sx={{
                            color:'custom2.contrastText',
                            overflowX:'hidden',
                            overflowY:'auto',
                            flexGrow:1,
                        }}
                        >
                        {
                            (team) ? 
                            <>
                                {/* Something else */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/insights`}
                                    disableGutters
                                    selected={selected === 3}
                                    onClick={()=>setSelected(3)}
                                    >
                                    <InsightsRoundedIcon 
                                        sx={{
                                            marginLeft:'.75rem',
                                            marginRight:'.75rem',
                                        }}
                                        /> 
                                    Insights
                                </CustomListButton>
                            </> :
                            <ListItemText
                                primaryTypographyProps={{
                                    align:'center',
                                    sx:{
                                        color:'custom2.light'
                                    }
                                }}
                                >
                                Select a team first.
                            </ListItemText>
                        }
                    </List>
                    {/* Team Nav Footer */}
                    <List
                        sx={{
                            color:'custom2.contrastText',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                        >
                        {
                            (team) && 
                            <>
                                {/* Something else */}
                                <CustomListButton
                                    component={RouterLink}
                                    // to='plans'
                                    disableGutters
                                    selected={selected === 'settings'}
                                    onClick={()=>setSelected('settings')}
                                    >
                                    <TuneRoundedIcon 
                                        sx={{
                                            marginLeft:'.75rem',
                                            marginRight:'.75rem',
                                        }}
                                        /> 
                                    Team Settings
                                </CustomListButton>
                            </>
                        }
                    </List>
                    {/* Divider */}
                    <Divider sx={{backgroundColor:'custom2.light'}} />
                    {/* Footer */}
                    <List
                        sx={{
                            color:'custom2.contrastText',
                            overflowX:'hidden',
                            overflowY:'auto',
                        }}
                        >
                        {/* Something else */}
                        <CustomListButton
                            component={RouterLink}
                            to='choose-team'
                            disableGutters
                            selected={selected === 'team'}
                            onClick={()=>setSelected('team')}
                            >
                            {
                                (team) ?
                                <>
                                    <GroupsRoundedIcon 
                                        sx={{
                                            marginLeft:'.75rem',
                                            marginRight:'.75rem',
                                            color:'primary.main'
                                        }}
                                        /> 
                                    {team.name}
                                </> :
                                <>
                                    <GroupsRoundedIcon 
                                        sx={{
                                            marginLeft:'.75rem',
                                            marginRight:'.75rem',
                                            color:'primary.main'
                                        }}
                                        /> 
                                    Choose a team
                                </>
                            }
                            <KeyboardArrowRightRoundedIcon
                                sx={{
                                    marginLeft:'auto',
                                    marginRight:'.75rem',
                                }}                                        
                                />
                        </CustomListButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}








