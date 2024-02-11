import {useState, useId} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {Card, Form, FloatingLabel, Button, Row, Container} from 'react-bootstrap';

///////////////
// Container //
///////////////

export default function CreateAccount() {
    const navigate = useNavigate(); // Used to navigate to another webpage
    const [validated, setValidated] = useState(false); // true if signup has been pressed to start validation
    const [usedEmail, setUsedEmail] = useState(false);
    // Form data to control the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm: '',
    });
    // Checks jf password satisfies the requirements
    const [validPassword, setValidPassword] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    })

    // Handles user input (not radio)
    function handleChange({target}) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        // Resets whether the email is used
        setUsedEmail(false);

        // Checks which requirements has been satisfied
        if (target.name === 'password') {
            setValidPassword({
                length: target.value.length >= 8,
                uppercase: /[A-Z]/.test(target.value),
                lowercase: /[a-z]/.test(target.value),
                number: /\d/.test(target.value),
                special: /[^A-Za-z0-9]/.test(target.value),
            })
        }
    }

    function handleSignUp(event) {
        // Default stuff and stop built-in behaviors
        const target = event.target;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true); // Set to show that forms can start validation

        // Checks to see if all requirements are satisfied to create user
        if (isValidEmail(true) && isMatching(true) && isValidPassword(true)) {
            axios.post('http://127.0.0.1:8000/user/create/', { // Create the user and redirect to login
                    email: target.email.value,
                    password: target.password.value,
                })
                .then(response => navigate('/login')) // Direct to login after creation
                .catch(error => setUsedEmail(true)); // Email is already used
        }
    }

    // This function simply checks if the email is a valid email format
    function isValidEmail(bypass=false) {
        // eslint-disable-next-line
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (validated || bypass) {
            return emailRegex.test(formData.email);
        }

        return true;
    }

    // Checks if the password and confirmation is martching
    function isMatching(bypass=false) {
        if (validated || bypass) {
            return formData.password === formData.confirm;
        }

        return true;
    }

    // Checks if it is a valid password
    function isValidPassword(bypass=false) {
        if (validated || bypass) {
            for (let k in validPassword) {
                if (!validPassword[k]) {
                    return false;
                }
            }

            return true;
        }

        return true;
    }

    return <CreateAccountComponent 
        handleSignUp={handleSignUp} 
        validated={validated} 
        formData={formData}
        handleChange={handleChange}
        isValidEmail={isValidEmail}
        isMatching={isMatching}
        validPassword={validPassword}
        isValidPassword={isValidPassword}
        usedEmail={usedEmail}
        />;

}
///////////////
// Component //
///////////////

export function CreateAccountComponent({
    handleSignUp, handleChange,
    validated, formData, validPassword, 
    isValidEmail, isMatching, isValidPassword, usedEmail
    }) {

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '80vh'}}>
            <Container> 
                {/* Title */}
                <Row className='text-center'>
                    <h1 className='text-primary'><b>Simply PLC</b></h1>
                </Row>
                <Row className='justify-content-center'>
                    {/* Card */}
                    <Card className='shadow-lg border-0' style={{width: '30rem'}}>
                        <Card.Body>
                            <Card.Title className='text-center'>Create Account</Card.Title>
                            {/* Form */}
                            <Form onSubmit={handleSignUp} validated={false} noValidate>
                                {/* Email */}
                                <Form.Group className="mb-3" controlId={useId()}>
                                    <FloatingLabel controlId={useId()} label="Enter Email">
                                        <Form.Control 
                                            required 
                                            type="email" 
                                            placeholder="Enter Email" 
                                            name='email' 
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!isValidEmail() || usedEmail}
                                            />
                                        {/* This just checks the reason for invalid email, then gives proper feedback */}
                                        {(usedEmail) ? <Form.Control.Feedback type='invalid'>Email already used</Form.Control.Feedback> :
                                                        <Form.Control.Feedback type='invalid'>Invalid email</Form.Control.Feedback>}
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
                                            isInvalid={!isValidPassword()}
                                            />
                                        <Form.Text className="text-muted">
                                            {/* Show individual validation feedback */}
                                            <div>Password must:</div>
                                            <div className={validPassword.length ? 'text-success' : 'text-danger'}>
                                                &bull; Be at least 8 characters long
                                            </div>
                                            <div className={validPassword.uppercase ? 'text-success' : 'text-danger'}>
                                                &bull; Contain at least one uppercase letter
                                            </div>
                                            <div className={validPassword.lowercase ? 'text-success' : 'text-danger'}>
                                                &bull; Contain at least one lowercase letter
                                            </div>
                                            <div className={validPassword.number ? 'text-success' : 'text-danger'}>
                                                &bull; Contain at least one number
                                            </div>
                                            <div className={validPassword.special ? 'text-success' : 'text-danger'}>
                                                &bull; Contain at least one special character
                                            </div>
                                        </Form.Text>
                                    </FloatingLabel>
                                </Form.Group>
                                {/* Confirm Password */}
                                <Form.Group className="mb-3" controlId={useId()}>
                                    <FloatingLabel controlId={useId()} label="Confirm Password">
                                        <Form.Control 
                                            required 
                                            type="password" 
                                            placeholder="Confirm Password" 
                                            name='confirm' 
                                            value={formData.confirm}
                                            onChange={handleChange}
                                            isInvalid={!isMatching()}
                                            />
                                        <Form.Control.Feedback type='invalid'>Passwords do not match</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                {/* Buttons */}
                                <div className='d-flex justify-content-center'>
                                    <Button className='ms-2 me-' variant="primary" to='/login/' as={Link}>
                                        Back
                                    </Button>
                                    <Button className='ms-2 me-2' variant="primary" type="submit">
                                        Sign Up!
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







