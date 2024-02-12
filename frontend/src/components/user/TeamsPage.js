import {Card, Button, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

import CardButton from '../general/CardButton';


///////////////
// Container //
///////////////

export default function TeamsPage() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const stuff = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8'];
        setTeams(stuff);
    }, []);

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
            <Card body bg='light' className='border-0'>
                <Button className='me-5' variant='light' onClick={handleBackButton}>
                    <i className='bi-chevron-left text-dark' style={{webkitTextStroke: '.1rem'}} />
                </Button>
                <div className='h1 fw-bold d-inline-block align-middle'>Teams</div>
            </Card>
            <Card body bg='light' className='border-0'>
                <Row>
                    {teams.map((v, i) => (
                        <Col md='3' className='mb-4'>
                            <CardButton>
                                <div className='d-flex'>
                                    <div className='text-right mt-auto mb-auto'>
                                        <i className='bi-bar-chart-fill pe-1 h2 text-primary' />
                                    </div>
                                    <Button variant='link' className='rounded-circle ms-auto align-top'>
                                        <i className='bi-three-dots-vertical fs-4 text-dark' />
                                    </Button>
                                </div>
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





