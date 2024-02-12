import {Card, Button, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

import CardButton from '../general/CardButton';
import Hover from '../general/Hover';


///////////////
// Container //
///////////////

export default function TeamsPage() {
    const navigate = useNavigate(); // This is for navigation
    const [teams, setTeams] = useState([]); // This is the state for teams

    // Get the info
    useEffect(() => {
        const stuff = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8'];
        setTeams(stuff); // Set the info to teams
    }, []);

    // This just returns back
    function handleBackButton() {
        navigate(-1);
    }

    return <TeamsPageComponent 
        handleBackButton={handleBackButton} 
        teams={teams} 
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleBackButton,
    teams,
    }) {
    return (
        <div className='m-3'>
            {/* This is the header section with title and back button and add button */}
            <Card body bg='light' className='border-0'>
                {/* This is the back button */}
                <Button className='me-5' variant='light' onClick={handleBackButton}>
                    <i className='bi-chevron-left text-dark' style={{webkitTextStroke: '.1rem'}} />
                </Button>
                {/* This is the title */}
                <div className='h1 fw-bold d-inline-block align-middle'>Teams</div>
            </Card>
            {/* This is the body section */}
            <Card body bg='light' className='border-0'>
                <Row>
                    {/* This creates all the individual cards for the teams */}
                    {teams.map((v, i) => (
                        <Col md='3' className='mb-4'>
                            <CardButton onClick={()=>alert('hi')}>
                                {/* This is the header */}
                                <div className='d-flex'>
                                    {/* This is the icon */}
                                    <div className='text-right mt-auto mb-auto'>
                                        <i className='bi-bar-chart-fill pe-1 h2 text-primary' />
                                    </div>
                                    {/* This is the menu button */}
                                    <Button variant='link' className='rounded-circle ms-auto align-top mt-auto mb-auto'>
                                        <Hover 
                                            c={<i />} 
                                            change={{fontSize:'1.7rem'}} 
                                            style={{fontSize:'1.5rem', lineHeight:'2.1rem'}}
                                            className='bi-three-dots-vertical text-dark text-center' />
                                    </Button>
                                </div>
                                {/* This is the body */}
                                <div className='h3 fw-bold text-center'>
                                    {v}
                                </div>
                            </CardButton>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
}





