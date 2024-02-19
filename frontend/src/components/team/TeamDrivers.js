import {Card, Modal, Form, Button, FloatingLabel} from 'react-bootstrap';
import {useState, useId} from 'react';

import Hover from '../general/Hover';



export default function TeamDrivers() {
    const [show, setShow] = useState(); // show or close modal
    const formId = useId(); // Sets form id so button can access without being in the form
    const [required, setRequired] = useState({
        goal: false,
        population: false,
        byNum: false,
        byDate: false,
    }); // Checks that goal is entered
    const [formData, setFormData] = useState({ // This is to control the form input
        goal: '',
        population: '',
        byNum: '',
        byDate: '',
    });

    // handles controlling the input
    function handleChange({target}) {
        // This controls the form input
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        setRequired({
            ...required,
            [target.name]: false,
        });
    }

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    // This handles closing create modal
    function handleCloseModal() {
        setFormData({ // Resets form data
            goal: '',
            population: '',
            byNum: '',
            byDate: '',
        });

        setShow(false); // Close modal
    }

    async function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        const validList = [];
        for (let key in formData) {
            validList.push(isValid(key, true));
        }

        if (!validList.every(Boolean)) {
            return;
        }

        alert('aim saved!');
        handleCloseModal();
    }

    // Checks the validity of team name
    function isValid(name, bypass=false) { 
        // eslint-disable-next-line
        if (required[name] || bypass) {
            if (formData[name] !== '') {
                return true;
            } else {
                if (bypass) {
                    required[name] = true;
                    setRequired({...required})
                }
                
                return false;
            }
        }

        return true;
    }

    return <TeamDriversComponent
        show={show}
        formId={formId}
        formData={formData}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleSaveModal={handleSaveModal}
        isValid={isValid}
        />
}


export function TeamDriversComponent({
    handleCloseModal, handleChange, handleSaveModal, handleOpenModal,
    show, formId, formData,
    isValid,
    }) {
    return (
        <>
            {/* Card */}
            <Card body className='border-0 shadow-sm h-100 rounded-4'>
                {/* Header */}
                <div className="d-flex">
                    {/* Title */}
                    <div className='h2'>Drivers</div>
                    {/* Add button */}
                    <Hover 
                        comp={(props)=><span {...props}></span>}
                        style={{width:'3rem', transition: 'width .2s ease'}}
                        cStyle={{width:'8.5rem'}}
                        className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                        onClick={(handleOpenModal)}
                        >
                        {/* Hidden text; show on hover */}
                        <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Driver</span>
                        {/* Plus sign */}
                        <span className='bi-plus-lg fs-5 ms-auto' />
                    </Hover>
                </div>
                {/* body */}
                <Card body className='border-0 bg-light mt-2 rounded-4' style={{height:"82%"}}>
                    hi
                </Card>
            </Card>
            {/* Modal */}
            <Modal show={show} onHide={handleCloseModal}>
                {/* Header */}
                <Modal.Header closeButton>
                    {/* Title */}
                    <Modal.Title>Add Aim</Modal.Title>
                </Modal.Header>
                {/* Body */}
                <Modal.Body>
                    {/* Form */}
                    <Form id={formId} onSubmit={handleSaveModal} validated={false} noValidate>
                        {/* Team Name */}
                        <Form.Group className="mb-3" controlId={useId()}>
                            <FloatingLabel controlId={useId()} label="What do you want to accomplish?">
                                <Form.Control 
                                    placeholder="Goal" 
                                    name='goal' 
                                    value={formData.goal}
                                    onChange={handleChange}
                                    isInvalid={!isValid('goal')}
                                    />
                                    {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
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