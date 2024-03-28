import {useState} from 'react';

import Box from '@mui/material/Box';

import GoalsNavbar from './GoalsNavbar';

export default function Goals() {
    // goals --> this is where the driver diagrams and aims are defined

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
            <GoalsNavbar shadow={shadow} />
            <Box>
                content
            </Box>
        </>
    );
}