import {Card, Button, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

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
    const decodedToken = jwtDecode(localStorage.getItem("access_token")); // Get decoded access token

    // Get the teams info
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/user/${decodedToken.user}`, {
                    headers: {'Content-Type': 'application/json'},
                    // withCredentials: true
                }
            )
            .then(response => setTeams(response.data.team_memberships)) // Sets the teams info after getting it from backend
            .catch(error => {
                if (error.response.status === 401) { // Use is no longer logged in
                    localStorage.clear(); // Clear local storage
                    navigate('/login'); // redirectss
                } else {
                    console.log(error.message);
                }
            });


    }, [decodedToken.user, navigate]);

    // This just returns back
    function handleBackButton() {
        navigate(-1);
    }

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    return <TeamsPageComponent 
        handleBackButton={handleBackButton} 
        handleOpenModal={handleOpenModal}
        teams={teams} 
        show={show}
        setShow={setShow}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleBackButton, handleOpenModal, 
    teams, show, setShow,
    }) {
    return (
        <>
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
                            <TeamPageCard team={v} />
                        ))}
                    </Row>
                </Card>
            </div>

            {/* Modal for Creating Team */}
            <CreateTeamModal 
                handleOpenModal={handleOpenModal}
                show={show}
                setShow={setShow}
                />
        </>
    );
}





