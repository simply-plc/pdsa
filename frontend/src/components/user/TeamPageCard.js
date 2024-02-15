import {Card, Col} from 'react-bootstrap';

import Hover from '../general/Hover';


///////////////
// Container //
///////////////

export default function TeamsPageCard({team}) {
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

    return <TeamsPageCardComponent 
        handleSelectTeam={handleSelectTeam}
        handleTeamMenu={handleTeamMenu}
        team={team}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageCardComponent({
    handleSelectTeam, handleTeamMenu,
    team,
    }) {
    return (
        <Col md='3' className='mb-4' style={{height:'11rem'}}>
            <Hover 
                comp={Card}
                body
                onClick={handleSelectTeam} 
                style={{height:'11rem', transition: 'height .1s ease'}} 
                cStyle={{cursor: 'pointer', height: `${team.team_get_members.split('\n').length*1.5+13.5}rem`, zIndex:2}}
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
                <div className='d-flex mb-4' style={{height:'4rem'}}>
                    {/* This is the team name */}
                    <span className='m-auto ms-0 mt-0 me-2 h3 fw-bold overflow-auto h-100 w-100'>{team.team_name}</span>
                    {/* This is the additional info */}
                    <span className='m-auto me-0 mt-0'>
                        {/* Aims */}
                        <div className='text-nowrap text-right'>
                            Aims: 0
                        </div>
                        {/* Drivers */}
                        <div className='text-nowrap text-right'>
                            Drivers: 0
                        </div>
                        {/* Tasks */}
                        <div className='text-nowrap text-right'>
                            Tasks: 0
                        </div>
                    </span>
                </div>
                {/* This is the members title */}
                <div className='d-flex fw-bold' style={{fontSize:'1rem'}}>
                    Members:
                </div>
                {/* This is the list of members */}
                <div className='d-flex overflow-auto' style={{fontSize:'1rem'}}>
                    {team.team_get_members}
                </div>
            </Hover>
        </Col>
    );
}





