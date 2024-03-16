import {useState, useEffect} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import http from '../../http';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

import LandingNavbar from './LandingNavbar';



export default function Login() {

    ///////////////
    // Container //
    ///////////////

    const navigate = useNavigate();
    const [shadow, setShadow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: '',
    });

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;

                // Check if token is expired. If not, redirect to user page
                if (decodedToken.exp > currentTime) {
                    navigate('/user');
                } else { // if expired, then clear expired token
                    localStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [navigate]);

    // ***HANDLERS*** //

    function handleSubmit(event) {
        // Prevent normal built in stuff
        event.preventDefault();
        event.stopPropagation();

        // Check if error
        if (isError()) {
            setValidated(true);
            return;
        }

        // Clear and provide loading
        localStorage.clear();
        setLoading(true);

        // Login
        http.post('/user/token/', formData,)
            .then(response => {
                // Store tokens in local storage
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                // Store access token in the header to be sent for authorization
                http.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                // navigate to user
                navigate('/user');
            })
            .catch(error => {
                setLoading(false);
                (error.response.status === 401) ? setIncorrect(true) : alert(error.message);
            });
    }

    // Handles the user input 
    function handleChange({target}) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        // Resets the check for user existence when user starts typing
        setValidated(false);
        setIncorrect(false);
    }

    // Set shadow on scroll
    function handleWheel(event) {
        setShadow(window.scrollY !== 0);
    }

    // ***HELPER FUNCTIONS*** //

    // Check if input is empty
    function isEmpty(text, check=false) {
        return (validated || check) && text === '';
    }

    // This function simply checks if the email is a valid email format
    function isInvalidEmail(check=false) {
        // eslint-disable-next-line
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return (validated || check) && !emailRegex.test(formData.email);
    }

    function isError() {
        return isEmpty(formData.email, true) || isEmpty(formData.password, true) || isInvalidEmail(true);
    }

    ///////////////
    // Component //
    ///////////////

    return (
        <>
            {/* Navbar */}
            <LandingNavbar shadow={shadow} showNav={false} />
            {/* Body */}
            <Box sx={{height:'90vh', minHeight:'30rem'}}>
                <Box 
                    onWheel={handleWheel} 
                    sx={{ 
                        bgcolor:'background.paper',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        height:'80%',
                    }} 
                    >
                    <Fade in={true} easing='ease-in' timeout={.25*1000}>
                        {/* Login */}
                        <Stack spacing={3}>
                            {/* Header Text */}
                            <Stack spacing={2} sx={{maxWidth:'45rem'}}>
                                {/* Title */}
                                <Typography 
                                    variant='h3' 
                                    align='center'
                                    sx={{
                                        display:'flex', 
                                        justifyContent:'center',
                                        flexWrap:'wrap',
                                    }}
                                    >
                                    Begin collaborating&nbsp;
                                    <Typography 
                                        variant='inherit' 
                                        sx={{
                                            color:'primary.main',
                                            fontWeight:'bold'
                                        }}
                                        >simply
                                    </Typography>
                                </Typography>
                                {/* Subtitle */}
                                <Typography 
                                    variant='h4'
                                    align='center'
                                    sx={{
                                        color:'secondary.main'
                                    }}
                                    >
                                    Sign up to get started
                                </Typography>
                            </Stack>
                            {/* Login Inputs */}
                            <form name='login' onSubmit={handleSubmit}>
                                <Box
                                    sx={{
                                        display:'flex',
                                        justifyContent:'center'
                                    }}
                                    >
                                    <Stack spacing={3} sx={{width:'25rem'}}>
                                        {/* Email */}
                                        <TextField
                                            label='Email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            helperText={
                                                (isEmpty(formData.email)) ? 'Email required' : 
                                                (isInvalidEmail()) ? 'Invalid email' : ''
                                            }
                                            error={
                                                isEmpty(formData.email) ||
                                                isInvalidEmail() || 
                                                incorrect
                                            }
                                            />
                                        {/* Password */}
                                        <TextField
                                            type='password'
                                            label='Password'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            helperText={
                                                (isEmpty(formData.password)) ? 'Password required' : 
                                                (incorrect) ? 'Incorrect email or password' : ''
                                            }
                                            error={
                                                isEmpty(formData.password) ||
                                                incorrect
                                            }
                                            />
                                        {/* Confirm Password */}
                                        <TextField
                                            type='password'
                                            label='Confirm Password'
                                            name='confirm'
                                            value={formData.confirm}
                                            onChange={handleChange}
                                            helperText={
                                                (isEmpty(formData.password)) ? 'Password required' : 
                                                (incorrect) ? 'Incorrect email or password' : ''
                                            }
                                            error={
                                                isEmpty(formData.password) ||
                                                incorrect
                                            }
                                            />
                                        {/* Buttons */}
                                        <Button 
                                            variant='contained' 
                                            fullWidth
                                            type='submit'
                                            >
                                            {(loading) ? <CircularProgress color='inherit' size='1.55rem' /> : 'Sign up'}
                                        </Button>
                                        <Box
                                            sx={{
                                                display:'flex',
                                                justifyContent:'space-between',
                                            }}
                                            >
                                            <Link component={RouterLink} to='#' color='text.secondary'>Forgot password?</Link>
                                            <Link component={RouterLink} to='#' color='text.secondary'>Create an account</Link>
                                        </Box>
                                    </Stack>
                                </Box>
                            </form>
                        </Stack>
                    </Fade>
                </Box>

                {/* Footer */}
                <Box 
                    sx={{
                        bgcolor:'background.paper',
                        display:'flex',
                        alignItems:'end',
                        justifyContent:'center',
                        height:'20%',
                    }}
                    >
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link component={RouterLink} color="inherit" to='/'>
                            SimplyPLC
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}










