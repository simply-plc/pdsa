import {Card, Col, Dropdown} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

import http from '../../http';
import Hover from '../general/Hover';
import './TeamPageCard.css';


///////////////
// Container //
///////////////

export default function TeamsPageCard({team, teams, setTeams, index}) {
    const navigate = useNavigate(); // Get navigation
    const [teamInfo, setTeamInfo] = useState();

    useEffect(() => {
        http.get(`/api/user-team/${team.team_pk}/`)
            .then(response => {
                setTeamInfo(response.data);
            })
            .catch(error => alert(error.message));
    }, [team.team_pk])

    // This handles selecting team
    function handleSelectTeam(event) {
        navigate(`${team.team_pk}`); // Navigate to team page
    }

    // handles deleting the teams
    function handleDelete(event) {
        http.delete(`/api/team/${team.team_pk}/`,)
            .then(response => {
                teams.splice(index, 1);
                setTeams([...teams]);
            })
            .catch(error => alert(error.message));
    }

    function numAims() {
        return teamInfo?.aims?.length;
    }

    function numDrivers() {
        let driverTotal = 0;

        for (let i = 0; i < teamInfo?.aims.length; i++) {
            driverTotal += teamInfo.aims[i]?.drivers?.length;
        }

        return driverTotal;
    }

    function numChangeIdeas() {
        let changeIdeaTotal = 0;

        for (let i = 0; i < teamInfo?.aims.length; i++) {
            for (let j = 0; j < teamInfo?.aims[i].drivers.length; j++) {
                changeIdeaTotal += teamInfo?.aims[i].drivers[j].change_ideas.length;
            }
        }

        return changeIdeaTotal;
    }

    return <TeamsPageCardComponent 
        handleSelectTeam={handleSelectTeam}
        handleDelete={handleDelete}
        team={team}
        numAims={numAims}
        numDrivers={numDrivers}
        numChangeIdeas={numChangeIdeas}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageCardComponent({
    handleSelectTeam, handleDelete,
    team, numAims, numDrivers, numChangeIdeas,
    }) {
    return (
        <Col md='3' className='mb-4' style={{height:'11rem'}}>
            <Hover 
                comp={Card}
                body
                onClick={handleSelectTeam} 
                style={{height:'11rem', transition: 'height .2s ease'}} 
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
                        {/* Menu dropdown */}
                        <Dropdown onClick={(e)=>e.stopPropagation()}>
                            {/* Toggle Button */}
                            <Dropdown.Toggle className='bg-white border-white p-0'>
                                <Hover 
                                    comp={(props)=><span {...props} />} 
                                    style={{fontSize:'1.3rem', cursor:'pointer'}}
                                    cStyle={{fontSize:'1.5rem'}}
                                    className='bi-three-dots-vertical text-dark' 
                                    />
                            </Dropdown.Toggle>
                            {/* Menu */}
                            <Dropdown.Menu variant="dark">
                                {/* Archive */}
                                <Dropdown.Item>Archive</Dropdown.Item>
                                {/* Delete */}
                                <Dropdown.Item className='text-danger' onClick={handleDelete}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                            Aims: {numAims()}
                        </div>
                        {/* Drivers */}
                        <div className='text-nowrap text-right'>
                            Drivers: {numDrivers()}
                        </div>
                        {/* Tasks */}
                        <div className='text-nowrap text-right'>
                            Change Ideas: {numChangeIdeas()}
                        </div>
                    </span>
                </div>
                {/* This is the members title */}
                <div className='d-flex fw-bold' style={{fontSize:'1rem'}}>
                    Members:
                </div>
                {/* This is the list of members */}
                <div className='ms-1 overflow-auto' style={{fontSize:'1rem'}}>
                    {team.team_get_members.split('\n').map((v, i) => (
                        <div>{v}</div>
                    ))}
                </div>
            </Hover>
        </Col>
    );
}





