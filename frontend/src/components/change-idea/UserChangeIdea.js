import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Button, Row, Col} from 'react-bootstrap';

import Hover from '../general/Hover';
import InfoCycles from './InfoCycles';
import PDSA from './PDSA';

export default function UserChangeIdea() {
    /*
        User team is the team page that shows the aims, drivers, and change idea lists
    */
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams(); // Get params
    const [changeIdea, setChangeIdea] = useState(); // Current change idea info

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/change-idea/${params.changeIdeaId}/`, {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            .then(response => {
                setChangeIdea(response.data);
            })
            .catch(error => {
                // alert(error.message + ' UserTeam');
            });
    } ,[params.changeIdeaId]);

    // Back button NOTE: this is back to the teams page. When navigating 
    function handleBackButton() {
        if (location.state?.team) {
            const {team, ...optionState} = location.state;
            navigate(`../teams/${team.id}`, {state: optionState});
        } else {
            navigate(-1);
        }
    }

    return <UserChangeIdeaComponent 
        changeIdea={changeIdea} 
        location={location}
        handleBackButton={handleBackButton}
        />;
}

export function UserChangeIdeaComponent({
    changeIdea, location,
    handleBackButton, 
    }) {
    return (
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
                        <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>{changeIdea?.name}</div>
                        {/* Settings */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'14rem'}}
                            className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                            // onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Change Idea Settings</span>
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
                    {/* Info and Cycles */}
                    <InfoCycles changeIdea={changeIdea} aim={location.state.aim} driver={location.state.driver} />
                </Col>
                {/* Second Col */}
                <Col className='flex-grow-1 mb-3' lg={6}>
                    {/* Cylce form */}
                        <PDSA />
                </Col>
            </Row>
        </div>
    );
}















