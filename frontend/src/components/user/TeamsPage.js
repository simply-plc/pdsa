import {Card, Button, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

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

    // This handles creating a new team
    function handleCreateTeam(event) {
        event.stopPropagation();
        event.preventDefault();

        alert('Create Team');
    }

    // This handles selecting team
    function handleSelectTeam(event) {
        event.stopPropagation();
        event.preventDefault();

        alert('Select Team');
    }

    function handleTeamMenu(event) {
        event.stopPropagation();
        event.preventDefault();

        alert('Team Menu');
    }

    return <TeamsPageComponent 
        handleBackButton={handleBackButton} 
        handleCreateTeam={handleCreateTeam}
        handleSelectTeam={handleSelectTeam}
        handleTeamMenu={handleTeamMenu}
        teams={teams} 
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleBackButton, handleCreateTeam, handleSelectTeam, handleTeamMenu,
    teams,
    }) {
    return (
        <div className='m-3'>
            {/* This is the header section with title and back button and add button */}
            <Card body bg='light' className='border-0'>
                <div className='d-flex'>
                    {/* This is the back button */}
                    <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton}>
                        <span className='bi-chevron-left text-dark text-center' style={{fontSize: '1.5rem'}} />
                    </Button>
                    {/* This is the title */}
                    <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>Teams</div>
                    {/* This is the add button */}
                    <Hover 
                        comp={(props)=><a {...props}/>}
                        style={{width:'3rem', transition: 'width .2s ease'}}
                        cStyle={{width:'9.5rem'}}
                        className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                        onClick={(handleCreateTeam)}
                        >
                        <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Create Team</span>
                        <span className='bi-plus-lg fs-5 ms-auto' />
                    </Hover>
                </div>
            </Card>
            {/* This is the body section */}
            <Card body bg='light' className='border-0'>
                <Row>
                    {/* This creates all the individual cards for the teams */}
                    {teams.map((v, i) => (
                        <Col md='3' className='mb-4' style={{height:'9.5rem'}}>
                            <Hover 
                                comp={Card}
                                body
                                onClick={handleSelectTeam} 
                                style={{height:'9.5rem', transition: 'height .1s ease'}} 
                                cStyle={{cursor: 'pointer', height: '17rem', zIndex:2}}
                                className='w-100 border-light rounded-4 shadow-sm overflow-y-hidden'
                                cClassName='shadow-lg border-dark'
                                >
                                {/* This is the header */}
                                <div className='d-flex mb-3'>
                                    {/* This is the icon */}
                                    <div className='text-right mt-auto mb-auto'>
                                        <i className='bi-bar-chart-fill pe-1 h2 text-primary' style={{fontSize:'3rem'}} />
                                    </div>
                                    {/* This is the menu button */}
                                    <div className='ms-auto mt-auto mb-auto text-center' style={{width:'3rem'}}>
                                        <Hover 
                                            comp={(props)=><span {...props} />} 
                                            style={{fontSize:'1.3rem', cursor:'pointer'}}
                                            cStyle={{fontSize:'1.5rem'}}
                                            className='bi-three-dots-vertical text-dark' 
                                            onClick={handleTeamMenu}
                                            />
                                    </div>
                                </div>
                                {/* This is the body */}
                                <div className='d-flex mb-4'>
                                    <span className='m-auto ms-0 h3 fw-bold'>{v}</span>
                                    <span className='m-auto me-0'>Tasks: 0</span>
                                </div>
                                {/* This is the members */}
                                <div className='d-flex mb-1 fw-bold'>
                                    Members:
                                </div>
                                <div className='d-flex mb-1'>
                                    derekhuang7@gmail.com
                                </div>
                                <div className='d-flex mb-1'>
                                    derekhuang7@gmail.com
                                </div>
                                <div className='d-flex mb-1'>
                                    derekhuang7@gmail.com
                                </div>
                            </Hover>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
}





