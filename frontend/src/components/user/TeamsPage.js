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
                <div className='d-flex'>
                    {/* This is the back button */}
                    <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton} style={{width:'2.5rem', height:'2.5rem'}}>
                        <i className='bi-chevron-left text-dark' style={{webkitTextStroke: '.1rem'}} />
                    </Button>
                    {/* This is the title */}
                    <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>Teams</div>
                    {/* This is the add button */}
                    <Hover 
                        c={<i />} 
                        cStyle={{fontSize:'2.4rem', cursor:'pointer'}}
                        style={{fontSize:'2.2rem', lineHeight:'2.4rem'}}
                        className='bi-plus-circle text-dark ms-auto mb-auto mt-auto text-center' 
                        />
                </div>
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
                                    <div className='rounded-circle ms-auto align-top mt-auto mb-auto'>
                                        <Hover 
                                            c={<i />} 
                                            style={{lineHeight:'2rem', cursor:'pointer'}}
                                            cClassName='fs-4'
                                            className='bi-three-dots-vertical text-dark text-center fs-5' 
                                            />
                                    </div>
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





