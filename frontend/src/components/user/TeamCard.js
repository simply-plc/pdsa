import {useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

import DefaultTeamImage from './images/defaultTeamImg.jpg';


export default function TeamCard({team, setTeam}) {

    ///////////////
    // Conatiner //
    ///////////////

    const navigate = useNavigate();

    function handleSelectTeam() {
        setTeam(team);
        navigate(`../${team.id}`)
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            <Card sx={{width:'17.5rem'}}>
                <CardActionArea onClick={handleSelectTeam}>
                    {/*<CardMedia
                        component="img"
                        height="100"
                        image={DefaultTeamImage}
                        alt="default team image"
                        sx={{
                            backgroundColor:'background.paper'
                        }}
                    />*/}
                    {/* Logo replacement */}
                    <Box
                        sx={{
                            display:'flex',
                            backgroundColor:'custom2.light',
                            color:'custom2.contrastText',
                            alignItems:'center',
                            justifyContent:'center',
                            height:'5rem',
                        }}
                        >
                        <BarChartRoundedIcon fontSize='large' color='primary'  />
                        <Typography
                            variant='h5'
                            sx={{
                                fontWeight:'bold'
                            }}
                            >
                            SimplyPLC
                        </Typography>
                    </Box>
                    <CardContent>
                        {/* Team name */}
                        <Typography gutterBottom noWrap variant="h5" component="div">
                            {team.name}
                        </Typography>
                        {/* Aim content */}
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                height:'2.5rem',
                            }}
                            >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}