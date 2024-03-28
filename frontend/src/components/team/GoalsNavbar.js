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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';





export default function GoalsNavbar({shadow}) {

    ///////////////
    // Container //
    ///////////////




    ///////////////
    // Component //
    ///////////////


    return (
        <>
            {/* Menu */}
            <AppBar
                position='sticky'
                color='inherit'
                sx={{
                    boxShadow:(shadow) ? '0 2px 12px 0 rgba(36, 50, 66, 0.08)' : 0,
                }}
                >
                <Container disableGutters maxWidth='xl'> 
                    <Toolbar
                        variant={'dense'}
                        sx={{
                            display:'flex',
                            alignItems:'start',
                            marginTop:'1rem',
                        }}
                        >
                        {/* Logo */}
                        <BarChartRoundedIcon 
                            sx={{
                                backgroundColor:'primary.main',
                                color:'background.paper',
                                borderRadius:2,
                                fontSize:'3rem',
                                marginRight:'1rem',
                            }} 
                            />
                        {/* Stack */}
                        <Box>
                            <Breadcrumbs 
                                separator={<NavigateNextIcon sx={{typography:'body2'}} />}
                                sx={{
                                    '&.MuiBreadcrumbs-root':{
                                        '.MuiBreadcrumbs-separator':{
                                            marginRight:'.25rem',
                                            marginLeft:'.25rem',
                                        },
                                        '.MuiBreadcrumbs-li':{
                                            display:'flex'
                                        }
                                    },
                                }}
                                >
                                <Link 
                                    variant='body2'
                                    underline='hover' 
                                    color='inherit' 
                                    href='#'
                                    >
                                    Goals
                                </Link>
                                <Link 
                                    variant='body2'
                                    underline='hover' 
                                    color='inherit' 
                                    href='#'
                                    >
                                    RePlAcE
                                </Link>
                            </Breadcrumbs>
                            <Box>
                                <Typography variant='h5' sx={{fontWeight:'bold'}} >
                                    Goals
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}