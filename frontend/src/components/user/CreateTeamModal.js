import {Modal, Button, Form, FloatingLabel} from 'react-bootstrap';
import {useId, useState} from 'react';

///////////////
// Container //
///////////////

export default function CreateTeamModal({
    show, setShow,
    }) {
    const formId = useId(); // Sets form id so button can access without being in the form
    // This is to control the form input
    const [formData, setFormData] = useState({
        name: '',
    });


    // This handles closing create modal
    function handleCloseModal(event) {
        setFormData({ // Resets form data
            name: '',
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
        />
}


///////////////
// Component //
///////////////

export function TeamsPageComponent({
    handleCloseModal, handleSaveModal, handleChange,
    show, formData, formId,
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
                        {/* Confirm Password */}
                        {/*<Form.Group className="mb-3" controlId={useId()}>
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
                        </Form.Group>*/}
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





