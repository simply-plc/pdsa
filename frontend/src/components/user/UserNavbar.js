import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";


import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';




export default function UserNavbar() {

    ///////////////
    // Container //
    ///////////////

    const navigate = useNavigate();
    const location = useLocation();

    function handleClickLogo() {
        if (location.pathname !== '/') {
            navigate('/');
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            <AppBar
                position='sticky'
                color='secondary'
                sx={{
                    boxShadow:0,
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
                            }}
                            >
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
                        {/* End */}
                        <Stack
                            direction='row'
                            spacing={1}
                            sx={{
                                marginRight:1,
                            }}
                            >
                            <Box>
                                <Avatar 
                                    sx={{
                                        backgroundColor:'primary.main',
                                        width:'2rem',
                                        height:'2rem',
                                        fontSize:'1rem',
                                        color:'text.primary'
                                    }}
                                    >
                                    de
                                </Avatar>
                            </Box>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}