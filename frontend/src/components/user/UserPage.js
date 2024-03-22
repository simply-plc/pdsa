import {useState, useEffect} from 'react';
import {useNavigate, Outlet} from 'react-router-dom';

import Box from '@mui/material/Box';
import {jwtDecode} from 'jwt-decode';


import Toolbar from '@mui/material/Toolbar';

import UserNavbar from './UserNavbar';
import UserSidebar from './UserSidebar';


export default function UserPage() {

    ///////////////
    // Container //
    ///////////////

    const [open, setOpen] = useState(true); // for toggling sidebar
    const [decodedToken, setDecodedToken] = useState({}); // Sets decoded token
    const navigate = useNavigate();

    // Checks if the user is logged in
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token"); // See if there is an access token
        const currentTime = Date.now() / 1000;
        if (!accessToken) { // if not, redirect
            localStorage.clear();
            alert('You are not logged in');
            navigate('/login');
        } else { // if so, then decode the token
            const decodedToken = jwtDecode(accessToken);
            setDecodedToken(decodedToken);

            if (decodedToken.exp <= currentTime) { // If token is expired, then clear and redirect
                localStorage.clear();
                alert('You are not logged in');
                navigate('/login');
            }
        }
    }, [navigate]);

    // Handle toggling the sidebar
    function handleToggleSidebar() {
        setOpen(toggle=>!toggle);
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            {/* Navbar */}
            <UserNavbar handleToggleSidebar={handleToggleSidebar} decodedToken={decodedToken} />
            <Box
                sx={{
                    display:'flex',
                }}
                >
                {/* Sidebar */}
                <UserSidebar open={open} />
                {/* Content */}
                <Box
                    sx={{
                        flexGrow:1,
                    }}
                    >
                    {/* Spacing */}
                    <Toolbar variant='dense' />
                    {/* Content */}
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}