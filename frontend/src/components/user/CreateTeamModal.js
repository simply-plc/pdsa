import {Modal, Button, Form, FloatingLabel, InputGroup, Row, Col, CloseButton} from 'react-bootstrap';
import {useId, useState} from 'react';

///////////////
// Container //
///////////////

export default function CreateTeamModal({
    show, setShow,
    }) {
    const formId = useId(); // Sets form id so button can access without being in the form
    const shareButtonId = useId();
    // This is to control the form input
    const [formData, setFormData] = useState({
        name: '',
        share: '',
    });
    // This is a list of members
    const [members, setMembers] = useState([]);

    function handleAddMember(event) {
        setMembers([formData.share, ...members]);
        setFormData({
            ...formData,
            share: '',
        });
    }

    function handleRemoveMember({target}) {
        members.splice(target.id, 1);
        setMembers([...members])
    }

    // This handles closing create modal
    function handleCloseModal(event) {
        setFormData({ // Resets form data
            name: '',
            share: '',
        });

        setShow(false); // Close modal
    }

    // This handles closing create modal
    function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        setShow(false); // Close modall
        alert('saved!');
        setFormData({ // Resets form data (possibly temp)
            name: '',
            share: '',
        });
    }

    function handleChange({target}) {
        // This controls the form input
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
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
        members={members}
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleCloseModal, handleSaveModal, handleChange, handleAddMember, handleRemoveMember,
    show, formData, formId, shareButtonId, members,
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
                                    aria-label="Add Members" 
                                    aria-describedby={shareButtonId}
                                    />
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
                                    <Col md='9'>derekhuang7@gmail.com</Col>
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





