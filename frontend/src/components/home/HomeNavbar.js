import {useLocation, Outlet, Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

///////////////
// Container //
///////////////

export default function HomeNavbar() {
    const location = useLocation();

    return <HomeNavbarComponent location={location} />;
}

///////////////
// Component //
///////////////

export function HomeNavbarComponent({location}) {
    document.body.className = 'bg-light';

    return (
        <>
            <Navbar sticky="top" bg='light' data-bs-theme="light" >
                <Container fluid>
                    {/* Logo */}
                    <Navbar.Brand to='/' as={Link} className='text-primary'><b>SA</b></Navbar.Brand>
                    {/* Navbar Links */}
                    <Nav variant='underline'>
                        <Nav.Item>
                            <Nav.Link active={location.pathname==='/home'} eventKey='/' to='/' as={Link} >Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={location.pathname==='/about'} eventKey='/about' to='/about' as={Link} >About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={location.pathname==='/blog'} eventKey='/blog' to='/blog' as={Link} >Blog</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={['/login', '/createAccount'].includes(location.pathname)} eventKey='/login' to='/login' as={Link} >Login</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            {/* Children Pages (Navbar Link Pages) */}
            <Outlet />
        </>
    );
}