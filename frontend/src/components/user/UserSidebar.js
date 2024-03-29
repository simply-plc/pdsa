import { Link as RouterLink, useLocation } from "react-router-dom";
import {useState, useMemo, useEffect} from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ListItemText from '@mui/material/ListItemText';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Typography from '@mui/material/Typography';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VerticalSplitRoundedIcon from '@mui/icons-material/VerticalSplitRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';



export default function UserSidebar({open, team}) {

    ///////////////
    // Container //
    ///////////////

    const location = useLocation();
    const currentPathList = location.pathname.split('/')
    const [selected, setSelected] = useState(currentPathList[2]);

    useEffect(() => {
        setSelected(currentPathList[2]);
    }, [currentPathList]);

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
                            paddingBottom:0,
                        }}
                        >
                        {/* Home */}
                        <CustomListButton
                            component={RouterLink}
                            to='home'
                            disableGutters
                            selected={selected === 'home'}
                            >
                            <Tooltip title='Home' arrow placement='right' disableInteractive>
                                <HomeRoundedIcon
                                    sx={{
                                        marginLeft:'.75rem',
                                        marginRight:'.75rem',
                                    }}
                                    /> 
                            </Tooltip>
                            Home
                        </CustomListButton>
                        {/* Inbox */}
                        <CustomListButton
                            component={RouterLink}
                            to='inbox'
                            disableGutters
                            selected={selected === 'inbox'}
                            >
                            <Tooltip title='Inbox' arrow placement='right' disableInteractive>
                                <EmailRoundedIcon 
                                    sx={{
                                        marginLeft:'.75rem',
                                        marginRight:'.75rem',
                                    }}
                                    /> 
                            </Tooltip>
                            Inbox
                        </CustomListButton>
                        {/* Library */}
                        <CustomListButton
                            component={RouterLink}
                            to='library'
                            disableGutters
                            selected={selected === 'library'}
                            >
                            <Tooltip title='Library' arrow placement='right' disableInteractive>
                                <CategoryRoundedIcon 
                                    sx={{
                                        marginLeft:'.75rem',
                                        marginRight:'.75rem',
                                    }}
                                    /> 
                            </Tooltip>
                            Library
                        </CustomListButton>
                    </List>
                    {/* Divider */}
                    <Divider 
                        sx={{
                            color:'custom2.light', 
                            fontSize:'.75rem',
                            "&::before, &::after": {
                                borderColor: "custom2.light",
                            },
                        }}
                        >
                        Team
                    </Divider>
                    {/* Team Nav */}
                    <List
                        sx={{
                            color:'custom2.contrastText',
                            overflowX:'hidden',
                            overflowY:'auto',
                            flexGrow:1,
                            paddingTop:0,
                        }}
                        >
                        {
                            (team) ? 
                            <>
                                {/* Dashboard */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/dashboard`}
                                    disableGutters
                                    selected={selected === `${team.id}` && currentPathList[3] === 'dashboard'}
                                    >
                                    <Tooltip title='Dashboard' arrow placement='right' disableInteractive>
                                        <DashboardRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                            }}
                                            /> 
                                    </Tooltip>
                                    Dashboard
                                </CustomListButton>
                                {/* Goal */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/goals`}
                                    disableGutters
                                    selected={selected === `${team.id}` && currentPathList[3] === 'goals'}
                                    >
                                    <Tooltip title='Goals' arrow placement='right' disableInteractive>
                                        <TaskAltRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                            }}
                                            /> 
                                    </Tooltip>
                                    Goals
                                </CustomListButton>
                                {/* Plans */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/plans`}
                                    disableGutters
                                    selected={selected === `${team.id}` && currentPathList[3] === 'plans'}
                                    >
                                    <Tooltip title='Plans' arrow placement='right' disableInteractive>
                                        <VerticalSplitRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                            }}
                                            /> 
                                    </Tooltip>
                                    Plans
                                </CustomListButton>
                                {/* Projects */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/projects`}
                                    disableGutters
                                    selected={selected === `${team.id}` && currentPathList[3] === 'projects'}
                                    >
                                    <Tooltip title='Projects' arrow placement='right' disableInteractive>
                                        <ModelTrainingRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                            }}
                                            /> 
                                    </Tooltip>
                                    Projects
                                </CustomListButton>
                                {/* Divider */}
                                <Divider 
                                    sx={{
                                        color:'custom2.light', 
                                        fontSize:'.75rem',
                                        "&::before, &::after": {
                                            borderColor: "custom2.light",
                                        },
                                    }}
                                    >
                                    Members
                                </Divider>
                                {/* Members */}
                                <List 
                                    sx={{
                                        flexDirection:'column', 
                                        paddingTop:0, 
                                        paddingBottom:0,
                                    }}
                                    >
                                    {team.get_members.split('\n').map((v, i) => (
                                        <CustomListButton 
                                            disableGutters
                                            sx={{
                                                paddingTop:'.25rem',
                                                paddingBottom:'.25rem'
                                            }}
                                            >
                                            {/* active icon */}
                                            <Badge
                                                variant='dot'
                                                overlap='circular'
                                                badgeContent=" "
                                                // color='error'
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal:'right',
                                                }}
                                                sx={{
                                                    marginRight:'.75rem',
                                                    marginLeft:'1rem',
                                                    '& .MuiBadge-badge': {
                                                        width:'.75rem',
                                                        height:'.75rem',
                                                        top:'.4rem',
                                                        left:'.4rem',
                                                        borderRadius:9999,
                                                        border: '2px solid',
                                                        borderColor:'custom2.main',
                                                        backgroundColor:'grey.400' // Changes the active to busy to inactive
                                                    }
                                                }}
                                                >
                                                {/* Avatar */}
                                                <Tooltip title={v} arrow placement='right' disableInteractive>
                                                    <Avatar 
                                                        sx={{
                                                            width:'1.25rem',
                                                            height:'1.25rem',
                                                            fontSize:'.75rem',
                                                            backgroundColor:'primary.main', // Avatar background color
                                                            color:'primary.contrastText'
                                                        }} 
                                                        >
                                                        {v.substring(0,2)}
                                                    </Avatar>
                                                </Tooltip>
                                            </Badge>
                                            {/* email */}
                                            <Typography noWrap sx={{color:'grey.400', lineHeight:'100%'}}>
                                                {v}
                                            </Typography>
                                        </CustomListButton>
                                    ))}
                                </List>
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
                                {/* Settings */}
                                <CustomListButton
                                    component={RouterLink}
                                    to={`${team.id}/settings`}
                                    disableGutters
                                    selected={selected === `${team.id}` && currentPathList[3] === 'settings'}
                                    >
                                    <Tooltip title='Settings' arrow placement='right' disableInteractive>
                                        <TuneRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                            }}
                                            /> 
                                    </Tooltip>
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
                        {/* Create team */}
                        <CustomListButton
                            component={RouterLink}
                            to='choose-team'
                            disableGutters
                            selected={selected === 'choose-team'}
                            >
                            {
                                (team) ?
                                <>
                                    <Tooltip title='Choose a team' arrow placement='right' disableInteractive>
                                        <GroupsRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                                color:'primary.main'
                                            }}
                                            /> 
                                    </Tooltip>
                                    <Typography noWrap>
                                        {team.name}
                                    </Typography>
                                </> :
                                <>
                                    <Tooltip title='Choose a team' arrow placement='right' disableInteractive>
                                        <GroupsRoundedIcon 
                                            sx={{
                                                marginLeft:'.75rem',
                                                marginRight:'.75rem',
                                                color:'primary.main'
                                            }}
                                            /> 
                                    </Tooltip>
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








