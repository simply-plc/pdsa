import {Link as RouterLink} from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';



export default function Hero() {

    ///////////////
    // Container //
    ///////////////


    ///////////////
    // Component //
    ///////////////

    const theme = useTheme();

    return (
        <>
            <Fade in={true} easing='ease-in' timeout={.25*1000}>
                <Container
                    maxWidth='lg'
                    sx={{
                        height:'50vh', 
                        display:'flex',
                        alignItems:'end',
                        justifyContent:'center',
                        marginBottom:'10vh'
                    }}
                    >
                    <Stack spacing={3}>
                        {/* Title Description */}
                        <Box>
                            {/* Header */}
                            <Typography 
                                variant='h2' 
                                sx={{
                                    display:'flex', 
                                    justifyContent:'center'
                                }}
                                >
                                <Typography 
                                    variant='inherit' 
                                    sx={{
                                        color:'primary.main',
                                        fontWeight:'bold'
                                    }}
                                    >Simple&nbsp;
                                </Typography>
                                changes that matter.
                            </Typography>
                            {/* Subtitle */}
                            <Typography 
                                variant='subtitle1'
                                align='center'
                                >
                                Make systemic changes one PLC at a time. Plan, change, and improve all in one place
                            </Typography>
                        </Box>
                        {/* Buttons */}
                        <Stack
                            direction='row'
                            spacing={3}
                            sx={{
                                display:'flex',
                                justifyContent:'center'
                            }}
                            >
                            {/* Get Started */}
                            <Button
                                variant='contained'
                                size='large'
                                disableElevation
                                component={RouterLink}
                                to='/create-account'
                                sx={{
                                    borderRadius:4,
                                    fontWeight:'bold',
                                }}
                                >
                                Get Started
                            </Button>
                            {/* How it works */}
                            <Button
                                variant='outlined'
                                size='large'
                                color='secondary'
                                sx={{
                                    borderRadius:4,
                                    fontWeight:'bold'
                                }}
                                >
                                See how it works
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Fade>
        </>
    );
}