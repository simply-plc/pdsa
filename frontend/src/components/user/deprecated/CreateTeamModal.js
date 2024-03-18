import {Modal, Button, Form, FloatingLabel, InputGroup, Row, Col, CloseButton} from 'react-bootstrap';
import {useId, useState, useEffect} from 'react';

import http from '../../http';

///////////////
// Container //
///////////////

export default function CreateTeamModal({
    show, setShow, decodedToken, teams, setTeams,
    }) {
    const formId = useId(); // Sets form id so button can access without being in the form
    const shareButtonId = useId(); // Sets share button id
    const [validated, setValidated] = useState(false); // Checks when to show error message for email validation
    const [required, setRequired] = useState(false); // Checks that team name is entered
    const [dne, setDne] = useState([]);
    const [members, setMembers] = useState([decodedToken.email]); // This is a list of members
    const [formData, setFormData] = useState({ // This is to control the form input
        name: '',
        share: '',
    });

    useEffect(() => setMembers([decodedToken.email]), [decodedToken.email]);
    
    //// Handlers ////

    // This adds members
    function handleAddMember() {
        if (isValidEmail(true)) {
            setMembers([formData.share, ...members]); // adds new member to beginnig of list
            setFormData({ // Resets the input 
                ...formData,
                share: '',
            });
        } else {
            setValidated(true);
        }
    }

    // This removes members when x is clicked
    function handleRemoveMember({target}) {
        members.splice(target.id, 1); // removes the member at entry
        setMembers([...members]);
    }

    // Adds member on hitting enter
    function handleAddMemberEnter(event) {
        if (event.key === "Enter") {
            // Stops default and propagation
            event.preventDefault();
            event.stopPropagation();
            // Adds member
            handleAddMember();
        }
    }

    // This handles closing create modal
    function handleCloseModal() {
        setFormData({ // Resets form data
            name: '',
            share: '',
        });

        setDne([]); // resets users that don't exist
        setMembers([decodedToken.email]); // Resets memebers
        setShow(false); // Close modal
        setRequired(false);
    }

    // This handles closing create modal
    async function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        // check if name is inputted
        if (!isValidName(true)) {
            setRequired(true);
            return;
        } else if (!isValidNumMembers(true)) {
            setRequired(true);
            return;
        }

        const name = formData.name; // Team name
        // Set up the team_membership list
        const uniqueMembers = [...new Set(members)]; // makes users unique
        const team_memberships = uniqueMembers.filter((v,i) => v !== decodedToken.email).map((v, i) => ( // filter out owner and sets up
            {
                user: v,
            }
        ));


        // Including the user as admin
        team_memberships.push({ 
            user: decodedToken.email,
            is_admin: true,
        });

        // Setup the data
        const data = { 
            name: name,
            team_memberships: team_memberships,
        }

        // Post the data
        http.post('/api/team/create/', data,)
            .then(response => {
                setTeams([response.data, ...teams]); // Add the new teams to teams page (new team is hardcoded to be always last)
                handleCloseModal();
            })
            .catch(error => {
                    if (error.response?.status === 400) { // User doesn't exist
                        let failedEmails = error.response.data.team_memberships.filter((v, i) => 'user' in v); // Get and filter users that got the error
                        // get the actual emails that failed
                        failedEmails = failedEmails.map((v, i) => {
                            return v.user[0].match(/Object with email=([^\s]+) does not exist./)[1];
                        });

                        // set them up so validation can be displayed
                        setDne(failedEmails);
                    } else {
                        alert(error.message); // Any other errors, alert
                    }
                }
            );

    }

    // handles controlling the input
    function handleChange({target}) {
        // This controls the form input
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        setRequired(false);
        setValidated(false);
    }

    function isValidNumMembers(bypass=false) {
        if (required || bypass) {
            return members.length > 0;
        }

        return true;
    }

    // Checks the validity of email
    function isValidEmail(bypass=false) { 
        // eslint-disable-next-line
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (validated || bypass) {
            return emailRegex.test(formData.share);
        }

        return true;
    }

    // Checks the validity of team name
    function isValidName(bypass=false) { 
        // eslint-disable-next-line
        if (required || bypass) {
            return formData.name !== '';
        }

        return true;
    }

    return <TeamsPageComponent 
        handleCloseModal={handleCloseModal}
        handleSaveModal={handleSaveModal}
        handleChange={handleChange}
        show={show}
        formData={formData}
        formId={formId}
        shareButtonId={shareButtonId}
        handleAddMember={handleAddMember}
        handleRemoveMember={handleRemoveMember}
        handleAddMemberEnter={handleAddMemberEnter}
        isValidEmail={isValidEmail}
        isValidName={isValidName}
        members={members}
        decodedToken={decodedToken}
        dne={dne}
        isValidNumMembers={isValidNumMembers}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleCloseModal, handleSaveModal, handleChange, handleAddMember, handleRemoveMember, handleAddMemberEnter,
    isValidEmail, isValidName, isValidNumMembers,
    show, formData, formId, shareButtonId, members, decodedToken, dne,
    }) {
    return (
        <>
            <Modal show={show} onHide={handleCloseModal}>
                {/* Header */}
                <Modal.Header closeButton>
                    {/* Title */}
                    <Modal.Title>Create New Team</Modal.Title>
                </Modal.Header>
                {/* Body */}
                <Modal.Body>
                    {/* Form */}
                    <Form id={formId} onSubmit={handleSaveModal} validated={false} noValidate>
                        {/* Team Name */}
                        <Form.Group className="mb-3" controlId={useId()}>
                            <FloatingLabel controlId={useId()} label="Team Name">
                                <Form.Control 
                                    placeholder="Enter Team Name" 
                                    name='name' 
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!isValidName()}
                                    />
                                    {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Name Required</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        {/* Sharing with people */}
                        <InputGroup className="mb-3" hasValidation>
                                <Form.Control  
                                    placeholder="Add Members" 
                                    name='share' 
                                    value={formData.share}
                                    onChange={handleChange}
                                    onKeyDown={handleAddMemberEnter}
                                    isInvalid={!isValidEmail() || !isValidNumMembers()}
                                    aria-label="Add Members" 
                                    aria-describedby={shareButtonId}
                                    />
                                    {/* Add person */}
                                <Button variant="outline-info" id={shareButtonId} onClick={handleAddMember}>
                                    <span className='bi-plus-lg fs-3' />
                                </Button>
                                {/* Check validity */}
                                {
                                    (!isValidEmail()) ? <Form.Control.Feedback type='invalid'>Invalid email</Form.Control.Feedback> :
                                        <Form.Control.Feedback type='invalid'>Needs a minimum of one member</Form.Control.Feedback>
                                }
                        </InputGroup>
                        {/* List of people who have access */}
                        <Form.Text >
                            <div className='h6 me-1 ms-1'>Members:</div>
                            <div className='ms-1 me-1 overflow-y-auto' style={{maxHeight:'14rem', minHeight: '3rem'}}>
                                {/* This is for the first line */}
                                <Row className='border-bottom' />
                                {/* This is the rest of the list of people who will be on the team */}
                                {members.map((v, i) => (
                                    <Row className='border-bottom p-3'>
                                        {/* Email */}
                                        <Col className='d-flex' md='10'>
                                            <span className='overflow-hidden me-2'>{v}</span>
                                            {(dne.includes(v)) ? <span className='text-danger ms-auto text-nowrap'>User doesn't exist</span> : ''}
                                        </Col>
                                        {/* Remove button */}
                                        <Col className='d-flex'>
                                            <CloseButton id={i} className='ms-auto' onClick={handleRemoveMember} />
                                        </Col>
                                    </Row>
                                ))}
                                {/* This is for the user who is creating the team */} 
                                {/*<Row className='border-bottom p-3'>
                                    <Col md='9'>{decodedToken.email}</Col>
                                    <Col className='d-flex'>
                                        <div className='ms-auto'>(Owner)</div>
                                    </Col>
                                </Row>*/}
                            </div>
                        </Form.Text>
                    </Form>
                </Modal.Body>
                {/* Footer */}
                <Modal.Footer>
                    {/* Close */}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {/* Create */}
                    <Button form={formId} type='submit' variant="primary">
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}





