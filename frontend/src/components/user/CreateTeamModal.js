import {Modal, Button, Form, FloatingLabel, InputGroup, Row, Col, CloseButton} from 'react-bootstrap';
import {useId, useState} from 'react';
import axios from 'axios';


///////////////
// Container //
///////////////

export default function CreateTeamModal({
    show, setShow, decodedToken,
    }) {
    const formId = useId(); // Sets form id so button can access without being in the form
    const shareButtonId = useId(); // Sets share button id
    const [validated, setValidated] = useState(false); // Checks when to show error message for email validation
    const [members, setMembers] = useState([]); // This is a list of members
    const [formData, setFormData] = useState({ // This is to control the form input
        name: '',
        share: '',
    });

    
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

        setMembers([]); // Resets memebers
        setShow(false); // Close modal
    }

    // This handles closing create modal
    async function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        const name = formData.name; // Team name
        const team_memberships = members.map((v, i) => ( // Set up the team_membership lisst
            {
                user: v,
            }
        ));
        team_memberships.push({ // Including the user as admin
            user: decodedToken.email,
            is_admin: true,
        });

        const data = { // Setup the data
            name: name,
            team_memberships: team_memberships,
        }

        // Post the data
        const promise = await axios.post('http://127.0.0.1:8000/api/team/create/', data, {
                                            headers: {'Content-Type': 'application/json'},
                                        }
                                    )
                                    .catch(error => console.log(error.message));

        // TAKE THE TEAM DATA AND CHANGE setTeams to include the new team
        // ALSO change the serialization. does front end need all that info that is provided below? check TeamsPage when you
                                    // get the data from backend
        alert(JSON.stringify(promise.data));                      

        handleCloseModal();
    }

    // handles controlling the input
    function handleChange({target}) {
        // This controls the form input
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        setValidated(false);
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
        members={members}
        decodedToken={decodedToken}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleCloseModal, handleSaveModal, handleChange, handleAddMember, handleRemoveMember, handleAddMemberEnter,
    isValidEmail,
    show, formData, formId, shareButtonId, members, decodedToken,
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
                                    required 
                                    placeholder="Enter Team Name" 
                                    name='name' 
                                    value={formData.name}
                                    onChange={handleChange}
                                    />
                            </FloatingLabel>
                        </Form.Group>
                        {/* Sharing with people */}
                        <InputGroup className="mb-3">
                            <FloatingLabel controlId={useId()} label="Add Members" >
                                <Form.Control  
                                    placeholder="Add Members" 
                                    name='share' 
                                    value={formData.share}
                                    onChange={handleChange}
                                    onKeyDown={handleAddMemberEnter}
                                    isInvalid={!isValidEmail()}
                                    aria-label="Add Members" 
                                    aria-describedby={shareButtonId}
                                    />
                                    {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Invalid email</Form.Control.Feedback>
                            </FloatingLabel>
                            {/* Add person */}
                            <Button variant="outline-info" id={shareButtonId} onClick={handleAddMember}>
                                <span className='bi-plus-lg fs-3' />
                            </Button>
                        </InputGroup>
                        {/* List of people who have access */}
                        <Form.Text >
                            <div className='h6 me-1 ms-1'>Members:</div>
                            <div className='ms-1 me-1 overflow-auto' style={{maxHeight:'14rem', minHeight: '3rem'}}>
                                {/* This is for the first line */}
                                <Row className='border-bottom' />
                                {/* This is the rest of the list of people who will be on the team */}
                                {members.map((v, i) => (
                                    <Row className='border-bottom p-3'>
                                        <Col md='10'>{v}</Col>
                                        <Col className='d-flex'>
                                            <CloseButton id={i} className='ms-auto' onClick={handleRemoveMember} />
                                        </Col>
                                    </Row>
                                ))}
                                {/* This is for the user who is creating the team */} 
                                <Row className='border-bottom p-3'>
                                    <Col md='9'>{decodedToken.email}</Col> {/* ##### THIS IS HARDCODED. get user email */}
                                    <Col className='d-flex'>
                                        <div className='ms-auto'>(Owner)</div>
                                    </Col>
                                </Row>
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





