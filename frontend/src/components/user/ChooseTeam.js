import {useState, useEffect} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import http from '../../http';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import TeamCard from './TeamCard';
import CreateTeamDialog from './CreateTeamDialog';



export default function ChooseTeam() {

    ///////////////
    // Container //
    ///////////////

    const navigate = useNavigate(); // This is for navigation
    const [decodedToken, setTeam] = useOutletContext();
    const [teams, setTeams] = useState([]);
    const [open, setOpen] = useState(false);


    // Get the teams info
    useEffect(() => {
        http.get(`/user/${decodedToken.user}`,)
            .then(response => { // Sets the teams info after getting it from backend
                const teamsData = response.data.teams;
                teamsData.sort((a, b) => {
                    let firstJoin = b.team_memberships.filter((v, i) => v.user === response.data.email)[0].joined_date;
                    let secondJoin = a.team_memberships.filter((v, i) => v.user === response.data.email)[0].joined_date;
                    return new Date(firstJoin) - new Date(secondJoin);
                });
                setTeams(teamsData);
                //  TEMAMPPMPAMP @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       delete        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                setTeam(teamsData[0]); // Temp until you create the actual team selection stuff
            }) 
            .catch(error => {
                // alert(error.message);
            });


    }, [decodedToken.user, navigate]);


    function handleClickOpen() {
        setOpen(true);
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            {/* Header */}
            <Container 
                maxWidth='xl' 
                sx={{
                    marginTop:'1rem',
                    display:'flex',
                    alignItems:'center',
                }}>
                {/* Title */}
                <Typography variant='h5'>
                    Choose Team
                </Typography>
                {/* Create button */}
                <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={handleClickOpen}
                    size='small'
                    startIcon={<AddCircleOutlineRoundedIcon />}
                    sx={{
                        marginLeft:'1rem',
                        borderRadius:4,
                    }}
                    >
                    Create
                </Button>
            </Container>
            {/* Team list */}
            <Container
                maxWidth='xl'
                sx={{
                    marginTop:'1rem',
                }}
                >
                <Stack
                    direction='row'
                    spacing={2}
                    >
                    {
                        teams?.map((v, i) => (
                            <TeamCard team={v} index={i} teams={teams} setTeams={setTeams} />
                        )) ||
                        <Box
                            sx={{
                                width:'100%',
                                display:'flex',
                                justifyContent:'center',
                            }}
                            >
                            <CircularProgress />
                        </Box>
                    }
                </Stack>
            </Container>
            {/* Dialog Create Team */}
            <CreateTeamDialog open={open} setOpen={setOpen} decodedToken={decodedToken} />
        </>
    );
}









