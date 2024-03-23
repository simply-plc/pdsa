import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Card, Button, Badge, Row, Col} from 'react-bootstrap';

import http from '../../http';
import Hover from '../general/Hover';
import TeamAim from './TeamAim';
import TeamDrivers from './TeamDrivers';
import TeamChangeIdeas from './TeamChangeIdeas';
import UpdateTeamModal from './UpdateTeamModal';

export default function UserTeam() {
    /*
        User team is the team page that shows the aims, drivers, and change idea lists
    */
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams(); // Get params
    const [team, setTeam] = useState(location.state?.team); // Current team info
    const [selectedDriver, setSelectedDriver] = useState();
    const [selectedChangeIdea, setSelectedChangeIdea] = useState();
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);

    // Get team info on load
    useEffect(() => {
        http.get(`/api/user-team/${params.teamId}/`)
            .then(response => {
                setTeam(response.data);
                if (location.state) {
                    let newSelectedDriver = response.data.drivers.filter((driver) => driver.id === location.state.driver.id)[0];

                    setSelectedDriver(newSelectedDriver);
                }
            })
            .catch(error => {//////////////////// ERROR RIGHT HERE I THINK
                if (error.response.status === 403) {
                    alert('You do not have permission for this team!')
                    navigate('/');
                } else if (error.response.status === 404) {
                    alert('This doesn\'t exist')
                    navigate('/');
                }
            });
    } ,[params.teamId, location.state, navigate, update]);

    // Back button
    function handleBackButton() {
        navigate('../teams');
    }

    function handleOpenModal() {
        setShow(true);
    }



    return <UserTeamComponent 
        team={team} 
        handleBackButton={handleBackButton}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        selectedChangeIdea={selectedChangeIdea}
        setSelectedChangeIdea={setSelectedChangeIdea}
        setUpdate={setUpdate}
        handleOpenModal={handleOpenModal}
        show={show}
        setShow={setShow}
        />;
}

export function UserTeamComponent({
    team, 
    handleBackButton, 
    selectedAim, setSelectedAim,
    selectedDriver, setSelectedDriver,
    selectedChangeIdea, setSelectedChangeIdea, setUpdate,
    handleOpenModal, show, setShow,
    }) {
    return (
        <>
            <div className='vh-100 d-flex flex-column' style={{minHeight:'45rem'}}>
                {/* Top header nav */}
                <div> 
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
                                onClick={(handleOpenModal)}
                                >
                                {/* Hidden text; show on hover */}
                                <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Team Settings</span>
                                {/* Plus sign */}
                                <span className='bi-gear-fill fs-5 ms-auto' />
                            </Hover>
                        </div>
                    </Card>
                </div>
                {/* the rest */}
                <Row className='flex-grow-1 m-0'>
                    {/* First Col */}
                    <Col className='mb-3' lg={6}>
                        {/* Aims */}
                        <Row className='pb-2 w-100 m-0' style={{height:'30%'}}>
                            <TeamAim team={team} setUpdate={setUpdate} />
                        </Row>
                        {/* Drivers */}
                        <Row className='pt-2 w-100 m-0' style={{height:'70%'}}>
                            <TeamDrivers 
                                team={team} 
                                selectedDriver={selectedDriver} 
                                setSelectedDriver={setSelectedDriver} 
                                setSelectedChangeIdea={setSelectedChangeIdea} 
                                />
                        </Row>
                    </Col>
                    {/* Second Col */}
                    <Col className='flex-grow-1 mb-3' lg={6}>
                        {/* Change Ideas */}
                        <Row className='w-100 m-0' style={{height:'100%'}}>
                            <TeamChangeIdeas 
                                team={team} 
                                selectedDriver={selectedDriver} 
                                setSelectedDriver={setSelectedDriver} 
                                selectedChangeIdea={selectedChangeIdea} 
                                setSelectedChangeIdea={setSelectedChangeIdea} 
                                />
                        </Row>
                    </Col>
                </Row>
            </div>
            {/* Modal */}
            <UpdateTeamModal show={show} setShow={setShow} team={team} setUpdate={setUpdate} />
        </>
    );
}















