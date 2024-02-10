import {useLocation, Outlet, Link, NavLink} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

///////////////
// Container //
///////////////

export default function UserNavbar() {
    const location = useLocation();
    const patharray = location.pathname.split('/').filter(Boolean);
    patharray.shift();

    return <UserNavbarComponent patharray={patharray} />;
}

///////////////
// Component //
///////////////

export function UserNavbarComponent({patharray}) {
    document.body.className = 'bg-light';

    const linkStyle = ({ isActive, isPending, isTransitioning }) => {
        return {
            backgroundColor: isActive ? '#20c997' : '#212529'
        };
    }

    return (
        <div>
            <Navbar className='h-100 flex-column' bg='dark' data-bs-theme='dark' style={{width:'3.5rem', position:'fixed'}} >
                {/* Logo */}
                <div className='mb-3'>
                    <Navbar.Brand to='pdsa' as={Link} className='m-1 text-primary fw-bold'>SP</Navbar.Brand>
                </div>
                {/* Navbar Links */}
                <div>
                <Nav className='flex-column' variant='pills'>
                    <Nav.Item className='mb-2'>
                        <Nav.Link active={deepEqual(patharray, ['pdsa'])} style={linkStyle} eventKey='pdsa' to='pdsa' as={NavLink} className='rounded-circle' >
                            <i className='bi-ui-checks p-1' />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                        <Nav.Link active={deepEqual(patharray, ['driver'])} style={linkStyle} eventKey='driver' to='driver' as={NavLink} className='rounded-circle' >
                            <i className='bi-bullseye p-1' />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                        <Nav.Link active={deepEqual(patharray, ['team'])} style={linkStyle} eventKey='team' to='team' as={NavLink} className='rounded-circle' >
                            <i className='bi-people p-1' />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='mb-2'>
                        <Nav.Link active={deepEqual(patharray, ['logout'])} style={linkStyle} eventKey='logout' to='logout' as={NavLink} className='rounded-circle' >
                            <i className='bi-power p-1' />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                </div>
                <div>
                    <i className='text-white bi-power p-1' />
                </div>
            </Navbar>
            {/* Children Pages (Navbar Link Pages) */}
            <div style={{marginLeft:'3.5rem'}}> 
                <Outlet />
            </div>
        </div>
    );
}



function deepEqual(l1, l2) {
    return JSON.stringify(l1) === JSON.stringify(l2);
}



