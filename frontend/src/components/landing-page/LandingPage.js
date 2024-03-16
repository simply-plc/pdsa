import {useState} from 'react';

import Box from '@mui/material/Box';

import LandingNavbar from './LandingNavbar';
import Hero from './Hero';
import Features from './Features';

export default function LandingPage() {    

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
            <LandingNavbar shadow={shadow} showNav={true} />
            {/* Body */}
            <Box sx={{ bgcolor: 'background.paper' }} onWheel={handleWheel}>
                <Hero />
                <Features />
            </Box>
        </>
    );
}