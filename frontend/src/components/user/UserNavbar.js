import {Outlet, NavLink, useNavigate} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// user imports

///////////////
// Container //
///////////////

export default function UserNavbar() {
    const navigate = useNavigate(); // Navigate things
    const [expanded, setExpanded] = useState(false); // Determines if navbar is expanded or not
    const [decodedToken, setDecodedToken] = useState({}); // Sets decoded token

    // Checks if the user is logged in
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token"); // See if there is an access token
        const currentTime = Date.now() / 1000;

        if (!accessToken) { // if not, redirect
            localStorage.clear();
            navigate('/login');
        } else { // if so, then decode the token
            const decodedToken = jwtDecode(accessToken);
            setDecodedToken(decodedToken);

            if (decodedToken.exp <= currentTime) { // If token is expired, then clear and redirect
                // alert('expired token useNavbar')
                localStorage.clear();
                navigate('/login');
            }
        }
    }, [navigate]);

    // Handles expanding when mouse is over the navbar
    function handleExpand() {
        setExpanded(true);
    }

    // Handles collapsing when mouse leaves the navbar
    function handleCollapse() {
        setExpanded(false);
    }

    // Handlles the logout button
    async function handleLogout() {
        try {
            await axios.post('http://localhost:8000/user/logout/', {
                                            refresh_token:localStorage.getItem('refresh_token')
                                        },
                                        {
                                            headers: {'Content-Type': 'application/json'}
                                        },  
                                    )
                                    .catch(error => console.log(error.message));

            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            navigate('/login');
        } catch (e) {
            console.log('logout not working', e)
        }
    }

    return <UserNavbarComponent 
        expanded={expanded}
        handleExpand={handleExpand}
        handleCollapse={handleCollapse}
        handleLogout={handleLogout}
        decodedToken={decodedToken}
        />;
}

///////////////
// Component //
///////////////

export function UserNavbarComponent({
    expanded, decodedToken,
    handleExpand, handleCollapse, handleLogout
    }) {
    document.body.className = 'bg-light';

    return (
        <div className='d-flex vh-100 flex-row'>
            {/* Sidebar */}
            <Navbar 
                className='h-100 flex-column p-0' 
                bg='dark' 
                data-bs-theme='dark' 
                style={{width: expanded ? '12.5rem':'3.5rem', position:'fixed', zIndex: 100, transition: 'width 0.1s ease'}} 
                onMouseOver={handleExpand}
                onMouseLeave={handleCollapse}
                >
                {/* Logo */}
                <div className='border-bottom w-100 '>
                    <div className='d-flex '>
                        <Navbar.Brand className='text-nowrap overflow-x-hidden ms-3 text-primary fw-bold'>
                            {/* Icon */}
                            <i className='bi-bar-chart-fill pe-1' />
                            <div className='align-middle d-inline-block ms-3'>
                                {/* Title */}
                                <div>Simply PLC</div>
                                {/* User Email */}
                                <div className='text-secondary fw-light' style={{fontSize:'.8rem'}}>{decodedToken.email}</div>
                            </div>
                        </Navbar.Brand>
                    </div>
                </div>
                {/* Navbar Links */}
                <Nav className='mt-2 flex-column h-100 w-100' variant='pills'>
                    {/* Main navigation */}
                    <div className='ms-1 me-1'>
                        {/* overview */}
                        <Nav.Item className='mb-2'>
                            <Button variant='dark' to='overview' as={NavLink} className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                <i className='bi-box p-1' />
                                <span className='ms-3'>Overview</span>
                            </Button>
                        </Nav.Item>
                        {/* teams */}
                        <Nav.Item className='mb-2'>
                            <Button variant='dark' to='teams' as={NavLink} className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                <i className='bi-people-fill p-1' />
                                <span className='ms-3'>Teams</span>
                            </Button>
                        </Nav.Item>
                        {/* drivers */}
                        <Nav.Item className='mb-2'>
                            <Button variant='dark' to='drivers' as={NavLink} className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                <i className='bi-bullseye p-1' />
                                <span className='ms-3'>Drivers</span>
                            </Button>
                        </Nav.Item>
                        {/* Change Ideas */}
                        <Nav.Item className='mb-2'>
                            <Button variant='dark' to='change-ideas' as={NavLink} className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                <i className='bi-ui-checks p-1' />
                                <span className='ms-3'>Change Ideas</span>
                            </Button>
                        </Nav.Item>
                    </div>
                    {/* Logistics navigation */}
                    <div className='ms-auto me-auto mt-auto border-top w-100 pt-2 flex-column'>
                        <div className='ms-1 me-1'>
                            {/* settings */}
                            <Nav.Item className='m-auto mb-2'>
                                <Button variant='dark' to='settings' as={NavLink} className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                    <i className='bi-sliders p-1' />
                                    <span className='ms-3'>Settings</span>
                                </Button>
                            </Nav.Item>
                            {/* logout */}
                            <Nav.Item className='m-auto mb-2'>
                                <Button onClick={handleLogout} variant='dark' className='overflow-x-hidden text-nowrap w-100 rounded-end-5 rounded-start-3 text-start' >
                                    <i className='bi-power p-1' />
                                    <span className='ms-3'>Logout</span>
                                </Button>
                            </Nav.Item>
                        </div>
                    </div>
                </Nav>
            </Navbar>
            {/* Children Pages (Navbar Link Pages) */}
            <div className='flex-column' style={{width:'3.5rem'}}></div> 
            <div className='flex-column w-100'>
                <Outlet context={[decodedToken]} />
            </div>
        </div>
    );
}


