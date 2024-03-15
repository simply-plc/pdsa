import {useLocation, Outlet, Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

///////////////
// Container //
///////////////

export default function HomeNavbar() {
    const location = useLocation();
    const patharray = location.pathname.split('/').filter(Boolean);

    return <HomeNavbarComponent patharray={patharray} />;
}

///////////////
// Component //
///////////////

export function HomeNavbarComponent({patharray}) {
    document.body.className = 'bg-light';

    return (
        <>
            <Navbar sticky="top" bg='light' data-bs-theme="light" >
                <Container fluid>
                    {/* Logo */}
                    <Navbar.Brand to='/home' as={Link} className='text-primary'>
                        <i className='bi-bar-chart-fill pe-1' />
                    </Navbar.Brand>
                    {/* Navbar Links */}
                    <Nav variant='underline'>
                        <Nav.Item>
                            <Nav.Link active={deepEqual(patharray, ['home'])} eventKey='home' to='/home' as={Link} >Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={deepEqual(patharray, ['about'])} eventKey='about' to='/about' as={Link} >About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={deepEqual(patharray, ['blog'])} eventKey='blog' to='/blog' as={Link} >Blog</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={deepEqual(patharray, ['login']) || deepEqual(patharray, ['create-account'])} eventKey='login' to='/login' as={Link} >Login</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            {/* Children Pages (Navbar Link Pages) */}
            <Outlet />
        </>
    );
}



function deepEqual(l1, l2) {
    return JSON.stringify(l1) === JSON.stringify(l2);
}



