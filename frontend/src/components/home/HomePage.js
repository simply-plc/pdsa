import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {useState} from 'react';

import HomeNavbar from './HomeNavbar';
import Hero from './Hero';
import Features from './Features';

export default function HomePage() {    

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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#20c997',
            },
            secondary: {
                main: '#c92053',
            },
        },
        typography: {
            fontFamily: "'Nunito', sans-serif"
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Navbar */}
            <HomeNavbar shadow={shadow} />
            {/* Body */}
            <Box sx={{ bgcolor: 'background.paper' }} onWheel={handleWheel}>
                <Hero />
                <Features />
            </Box>
        </ThemeProvider>
    );
}