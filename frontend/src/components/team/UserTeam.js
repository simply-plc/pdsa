import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Button, Row, Col} from 'react-bootstrap';

import Hover from '../general/Hover';
import TeamAims from './TeamAims';
import TeamDrivers from './TeamDrivers';
import TeamChangeIdeas from './TeamChangeIdeas';

export default function UserTeam() {
    const navigate = useNavigate();
    const params = useParams(); // Get params
    const teamId = params.teamId; // Get team id from params
    const [team, setTeam] = useState(); // Current team info


    // Get team info on load
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/team/${teamId}/`, {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                // alert(error.message + ' UserTeam');
            });
    } ,[teamId]);

    // Back button
    function handleBackButton() {
        navigate(-1);
    }

    return <UserTeamComponent 
        team={team} 
        handleBackButton={handleBackButton}
        />;
}

export function UserTeamComponent({team, handleBackButton}) {
    return (
        <div className='vh-100'>
            <Row>
                {/* Header */}
                <Card body bg='light' className='border-0'>
                    <div className='d-flex'>
                        {/* Back button */}
                        <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton}>
                            <span className='bi-chevron-left text-dark text-center' style={{fontSize: '1.5rem'}} />
                        </Button>
                        {/* Title */}
                        <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>{team?.name}</div>
                        {/* Settings */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'10.5rem'}}
                            className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                            // onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Team Settings</span>
                            {/* Plus sign */}
                            <span className='bi-gear-fill fs-5 ms-auto' />
                        </Hover>
                    </div>
                </Card>
            </Row>
            <Row className='ms-3 me-1' style={{height:'87%'}}>
                {/* First Col */}
                <Col className='h-100 mb-3' md={6}>
                    {/* Aims */}
                    <Row style={{height:'49%'}}>
                        <TeamAims />
                    </Row>
                    <Row style={{height:'2%'}} /> 
                    {/* Drivers */}
                    <Row style={{height:'49%'}}>
                        <TeamDrivers />
                    </Row>
                </Col>
                {/* Second Col */}
                <Col className='h-100' md={6}>
                    {/* Change Ideas */}
                    <TeamChangeIdeas />
                </Col>
            </Row>
        </div>
    );
}















