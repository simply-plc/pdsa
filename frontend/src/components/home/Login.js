import {useState, useEffect, useId} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {Card, Form, FloatingLabel, Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import http from '../../http';



///////////////
// Container //
///////////////

export default function Login() {
    const navigate = useNavigate(); // used to navigate to different url
    const [validated, setValidated] = useState(false); // true if login has been pressed to start validation
    const [incorrect, setIncorrect] = useState(false); // true if the user info does not exists
    // Form data to control the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Checks if token expired. If not expired, then automatically redirect to user page
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

    // Handles the user input 
    function handleChange({target}) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        // Resets the check for user existence when user starts typing
        setIncorrect(false);
    }

    async function handleSubmit(event) {
        // Prevent normal built in stuff
        event.preventDefault();
        event.stopPropagation();
        // Start validation because submit is pressed
        setValidated(true);

        // Tries to login and get the tokens. Async/Await forces process to be done before moving on.
        const promise = await http.post('http://127.0.0.1:8000/user/token/', formData,)
                                .catch(error => alert(error.message));

        // Clear local storage
        localStorage.clear();

        // Check if user exists
        if (promise?.data?.access) {
            // Store tokens in local storage
            localStorage.setItem('access_token', promise.data.access);
            localStorage.setItem('refresh_token', promise.data.refresh);
            // Store access token in the header to be sent for authorization
            http.defaults.headers.common['Authorization'] = `Bearer ${promise.data.access}`;
            // redirect
            navigate('/user');
        } else { // User doesn't exist so tell user that
            setIncorrect(true);
        }
    }

    // This function simply checks if the email is a valid email format
    function isValidEmail() {
        // eslint-disable-next-line
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (validated) {
            return emailRegex.test(formData.email);
        }

        return true;
    }

    return <LoginComponent 
        handleSubmit={handleSubmit} 
        validated={validated} 
        isValidEmail={isValidEmail} 
        incorrect={incorrect} 
        formData={formData}
        handleChange={handleChange}
        />;
}


///////////////
// Component //
///////////////

export function LoginComponent({handleSubmit, validated, isValidEmail, incorrect, handleChange, formData}) {

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '80vh'}}>
            <Container>
                {/* Title */}
                <Row className='text-center'>
                    <h1 className='text-primary fw-bold'>Simply PLC</h1>
                </Row>
                <Row className='justify-content-center'>
                    {/* Card */}
                    <Card className='shadow-lg border-0' style={{width: '30rem'}} >
                        <Card.Body>
                            <Card.Title className='text-center'>Login</Card.Title>
                            {/* Form */}
                            <Form onSubmit={handleSubmit} validated={false} noValidate>
                                {/* Email */}
                                <Form.Group className="mb-3" controlId={useId()}>
                                    <FloatingLabel controlId={useId()} label="Enter Email">
                                        <Form.Control 
                                            required 
                                            type="email" 
                                            placeholder="Enter Email" 
                                            name='email' 
                                            value={formData.email}
                                            isInvalid={!isValidEmail() || incorrect} 
                                            onChange={handleChange}
                                            />
                                        {(!isValidEmail()) ? <Form.Control.Feedback type='invalid'>Invalid Email</Form.Control.Feedback> : null}
                                    </FloatingLabel>
                                </Form.Group>
                                {/* Password */}
                                <Form.Group className="mb-3" controlId={useId()}>
                                    <FloatingLabel controlId={useId()} label="Enter Password">
                                        <Form.Control 
                                            required 
                                            type="password" 
                                            placeholder="Enter Password" 
                                            name='password' 
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={incorrect}
                                            />
                                        <Form.Control.Feedback type='invalid'>Incorrect Email or Password</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                {/* Extra links */}
                                <Row className='mb-3'>
                                    {/* Create Account */}
                                    <Col className='text-center'>
                                        <Link className='text-secondary' to='/create-account'>Create Account</Link>
                                    </Col>
                                    {/* Forgot Password */}
                                    <Col className='text-center'>
                                        <Link className='text-secondary'>Forgot Password</Link>
                                    </Col>
                                </Row>
                                {/* Login Button */}
                                <div className='d-flex justify-content-center'>
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    );
}