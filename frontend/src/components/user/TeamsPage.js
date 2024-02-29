import {Card, Button, Row} from 'react-bootstrap';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {useEffect, useState} from 'react';

import http from '../../http';
import Hover from '../general/Hover';
import TeamPageCard from './TeamPageCard';
import CreateTeamModal from './CreateTeamModal';


///////////////
// Container //
///////////////

export default function TeamsPage() {
    const navigate = useNavigate(); // This is for navigation
    const [teams, setTeams] = useState([]); // This is the state for teams
    const [show, setShow] = useState(false); // this is the state for showing the modal
    const [decodedToken] = useOutletContext();

    // Get the teams info
    useEffect(() => {
        http.get(`http://127.0.0.1:8000/user/${decodedToken.user}`,)
            .then(response => { // Sets the teams info after getting it from backend
                const team_memberships = response.data.team_memberships;
                team_memberships.sort((a, b) => new Date(b.joined_date) - new Date(a.joined_date));
                setTeams(team_memberships);
            }) 
            .catch(error => {
                if (error.response.status === 401) { // User is no longer logged in
                    // alert(error.message + "TeamsPage");
                    localStorage.clear(); // Clear local storage
                    navigate('/login'); // redirectss
                } else {
                    // alert(error.message + "TeamsPage");
                }
            });


    }, [decodedToken.user, navigate]);

    // This just returns back
    function handleBackButton() {
        navigate('../');
    }

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    return <TeamsPageComponent 
        handleBackButton={handleBackButton} 
        handleOpenModal={handleOpenModal}
        teams={teams} 
        setTeams={setTeams}
        show={show}
        setShow={setShow}
        decodedToken={decodedToken}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleBackButton, handleOpenModal, 
    teams, setTeams, show, setShow, decodedToken,
    }) {
    return (
        <>
            <div className=''>
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
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'9.5rem'}}
                            className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                            onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Create Team</span>
                            {/* Plus sign */}
                            <span className='bi-plus-lg fs-5 ms-auto' />
                        </Hover>
                    </div>
                </Card>
                {/* This is the body section */}
                <Card body bg='light' className='border-0'>
                    <Row>
                        {/* This creates all the individual cards for the teams */}
                        {teams.map((v, i) => (
                            <TeamPageCard team={v} teams={teams} setTeams={setTeams} index={i} />
                        ))}
                    </Row>
                </Card>
            </div>

            {/* Modal for Creating Team */}
            <CreateTeamModal
                show={show}
                setShow={setShow}
                decodedToken={decodedToken}
                teams={teams}
                setTeams={setTeams}
                />
        </>
    );
}





