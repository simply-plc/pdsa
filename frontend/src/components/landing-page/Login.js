import {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import LandingNavbar from './LandingNavbar';



export default function Login() {

    ///////////////
    // Container //
    ///////////////

    const [shadow, setShadow] = useState(false);

    function handleWheel(event) {
        setShadow(window.scrollY !== 0);
    }

    ///////////////
    // Component //
    ///////////////

    return (
        <>
            {/* Navbar */}
            <LandingNavbar shadow={shadow} showNav={false} />
            {/* Body */}
            <Box 
                onWheel={handleWheel} 
                sx={{ 
                    bgcolor:'background.paper',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    height:'80vh'
                }} 
                >
                {/* Welcome Text */}
                <Box>
                    <Stack spacing={2} sx={{marginBottom: '2rem'}}>
                        {/* Header */}
                        <Typography 
                            variant='h3' 
                            sx={{
                                display:'flex', 
                                justifyContent:'center'
                            }}
                            >
                            Welcome to&nbsp;
                            <Typography 
                                variant='inherit' 
                                sx={{
                                    color:'primary.main',
                                    fontWeight:'bold'
                                }}
                                >SimplyPLC
                            </Typography>
                        </Typography>
                        {/* Subtitle */}
                        <Typography 
                            variant='h4'
                            align='center'
                            sx={{
                                color:'secondary.main'
                            }}
                            >
                            Login to get started
                        </Typography>
                    </Stack>
                    {/* Login Inputs */}
                    <Stack spacing={3}>
                        <TextField
                            label='Email'
                            name='email'
                            sx={{
                                width:'80%'
                            }}
                            />
                        <TextField
                            type='password'
                            label='Password'
                            name='password'
                            sx={{
                                width:'80%'
                            }}
                            />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}