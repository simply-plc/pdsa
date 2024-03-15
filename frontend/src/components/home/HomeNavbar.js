import { ThemeProvider, createTheme } from '@mui/material/styles';

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



export default function HomeNavbar({shadow}) {

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
                position='fixed'
                color='inherit'
                sx={{
                    boxShadow:(shadow) ? '0 2px 12px 0 rgba(36, 50, 66, 0.08)' : 0,
                }}
                >
                <Container maxWidth='lg'> 
                    <Toolbar
                        variant='dense'
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}
                        >
                        {/* Logo */}
                        <Stack 
                            direction='row' 
                            spacing={0}
                            sx={{
                                display:'flex',
                                alignItems:'center',
                            }}
                            >
                            <BarChartRoundedIcon color='primary' fontSize='large' />
                            <Box
                                sx={{
                                    fontWeight:'bold'
                                }}
                                >
                                SimplyPLC
                            </Box>
                        </Stack>
                        {/* Button Group */}
                        <Stack 
                            direction='row' 
                            spacing={2}
                            >
                            <Button
                                sx={{
                                    color:'text.primary',
                                    borderRadius:4,
                                }}
                                >
                                Login
                            </Button>
                            <Button 
                                variant='contained'
                                disableElevation
                                sx={{
                                    fontWeight:'bold',
                                    borderRadius:4,
                                }}
                                >
                                Get Started
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}