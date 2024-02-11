import {Card, Button, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';




///////////////
// Container //
///////////////

export default function TeamsPage() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [hover, setHover] = useState([]);

    useEffect(() => {
        const stuff = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7'];
        setTeams(stuff);
        setHover(Array(stuff.length).fill(false));
    }, []);

    function handleBackButton() {
        navigate(-1);
    }

    function handleMouseOver({currentTarget}) {
        const newHover = Array(teams.length).fill(false);
        newHover[Number(currentTarget.id)] = true;
        setHover(newHover);
    }

    function handleMouseLeave({currentTarget}) {
        setHover(Array(teams.length).fill(false));
    }

    // SEE THIS NOTE: see if you can create a component for each card that has its own handle mouse over so not everything is rerendering
    // and it makes it easier to read code <ClickableCard>

    return <TeamsPageComponent 
        handleBackButton={handleBackButton} 
        handleMouseLeave={handleMouseLeave}
        handleMouseOver={handleMouseOver}
        teams={teams} 
        hover={hover}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleBackButton, handleMouseLeave, handleMouseOver,
    teams, hover,
    }) {
    const renderedTeams = [];
    for (let i = 0; i < teams.length; i++) {
        renderedTeams.push(
            <Col md='3' className='mb-4'>
                <Card 
                    body 
                    id={i} 
                    className={`w-100 border-1 ${hover[i] ? 'border-dark' : 'border-white'} ${hover[i] ? 'shadow-lg' : 'shadow-sm'}`} 
                    style={{cursor: hover ? 'pointer' : ''}}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    >
                    <div className='h1 fw-bold text-center'>{teams[i]}</div>
                </Card>
            </Col>
        );
    }


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
                    {renderedTeams}
                </Row>
            </Card>
        </div>
    );
}





