import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Button, Row, Col} from 'react-bootstrap';

import Hover from '../general/Hover';
import TeamAims from './TeamAims';
import TeamDrivers from './TeamDrivers';
import TeamChangeIdeas from './TeamChangeIdeas';

export default function UserTeam() {
    /*
        User team is the team page that shows the aims, drivers, and change idea lists
    */
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams(); // Get params
    const [team, setTeam] = useState(); // Current team info
    const [selectedAim, setSelectedAim] = useState(location.state?.aim); // This determines which aim is selected
    const [selectedDriver, setSelectedDriver] = useState(location.state?.driver);
    const [selectedChangeIdea, setSelectedChangeIdea] = useState();
    // alert(JSON.stringify(location.state))

    // Get team info on load
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user-team/${params.teamId}/`, {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                // alert(error.message + ' UserTeam');
            });
    } ,[params.teamId]);

    // Back button
    function handleBackButton() {
        navigate(-1);
    }

    return <UserTeamComponent 
        team={team} 
        handleBackButton={handleBackButton}
        selectedAim={selectedAim}
        setSelectedAim={setSelectedAim}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        selectedChangeIdea={selectedChangeIdea}
        setSelectedChangeIdea={setSelectedChangeIdea}
        />;
}

export function UserTeamComponent({
    team, 
    handleBackButton, 
    selectedAim, setSelectedAim,
    selectedDriver, setSelectedDriver,
    selectedChangeIdea, setSelectedChangeIdea,
    }) {
    return (
        <div className='vh-100 d-flex flex-column' style={{minHeight:'45rem'}}>
            {/* Top header nav */}
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
            {/* the rest */}
            <Row className='ms-3  flex-grow-1'>
                {/* First Col */}
                <Col className='mb-3' lg={6}>
                    {/* Aims */}
                    <Row className='pb-2 w-100' style={{height:'50%'}}>
                        <TeamAims team={team} selectedAim={selectedAim} setSelectedAim={setSelectedAim} setSelectedDriver={setSelectedDriver} />
                    </Row>
                    {/* Drivers */}
                    <Row className='pt-2 w-100' style={{height:'50%'}}>
                        <TeamDrivers team={team} selectedAim={selectedAim} setSelectedAim={setSelectedAim} selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} setSelectedChangeIdea={setSelectedChangeIdea} />
                    </Row>
                </Col>
                {/* Second Col */}
                <Col className='flex-grow-1 mb-3' lg={6}>
                    {/* Change Ideas */}
                    <Row className='w-100' style={{height:'100%'}}>
                        <TeamChangeIdeas team={team} selectedAim={selectedAim} selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} selectedChangeIdea={selectedChangeIdea} setSelectedChangeIdea={setSelectedChangeIdea} />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}















