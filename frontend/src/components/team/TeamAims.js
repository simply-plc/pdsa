import {Card, Modal, Form, Button, ProgressBar, Dropdown} from 'react-bootstrap';
import {useState, useId, useEffect} from 'react';
import axios from 'axios';

import Hover from '../general/Hover';
import AimCard from './AimCard';



export default function TeamAim({team}) {
    const [aims, setAims] = useState(); // Sets the aim
    const [show, setShow] = useState(); // show or close modal
    const formId = useId(); // Sets form id so button can access without being in the form
    const [page, setPage] = useState(1);
    const [required, setRequired] = useState({
        goal: false,
        population: false,
        by_num: false,
        by_date: false,
    }); // Checks that goal is entered
    const [formData, setFormData] = useState({ // This is to control the form input
        goal: '',
        population: '',
        by_num: '',
        by_date: '',
    });

    // set the aims for the team
    useEffect(() => {
        const newAims = team?.aims;
        newAims?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        setAims(newAims)
    }, [team]);

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
            by_num: '',
            by_date: '',
        });

        setRequired({ // Resets the validation
            goal: false,
            population: false,
            by_num: false,
            by_date: false,
        });

        setPage(1); // Resets the page
        setShow(false); // Close modal
    }

    // Handles going to next page
    function handleNext() {
        setPage(() => page + 1);
    }

    // Handles going to prev page
    function handlePrev() {
        setPage(() => page - 1);
    }

    async function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        // Checks if all the inputs are filled
        const validList = [];
        for (let key in formData) {
            validList.push(isValid(key, true));
        }

        if (!validList.every(Boolean)) {
            return;
        }

        // Post the new aim
        axios.post('http://127.0.0.1:8000/api/aim/create/', {...formData, team: team.id})
            .then(response => {
                // Adds the aim
                aims.unshift(response.data);
                setAims([...aims]);
            })
            .catch(error => alert(error.message));

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

    return <TeamAimComponent 
        show={show}
        formId={formId}
        formData={formData}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSaveModal={handleSaveModal}
        isValid={isValid}
        page={page}
        aims={aims}
        setAims={setAims}
        />
}


export function TeamAimComponent({
    handleCloseModal, handleChange, handleSaveModal, handleOpenModal, handleNext, handlePrev,
    show, formId, formData,
    isValid, page, aims, setAims,
    }) {
    return (
        <>
            {/* Card */}
            <Card body className='border-0 shadow-sm h-100 rounded-4'>
                {/* Header */}
                <div className="d-flex">
                    {/* Title */}
                    <div className='h2'>Aims</div>
                    {/* Add button */}
                    <Hover 
                        comp={(props)=><span {...props}></span>}
                        style={{width:'3rem', transition: 'width .2s ease'}}
                        cStyle={{width:'7.5rem'}}
                        className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                        onClick={(handleOpenModal)}
                        >
                        {/* Hidden text; show on hover */}
                        <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Aim</span>
                        {/* Plus sign */}
                        <span className='bi-plus-lg fs-5 ms-auto' />
                    </Hover>
                </div>
                {/* Body */}
                <Card body className='border-0 bg-light mt-2 rounded-4' style={{height:"14rem"}}>
                    {/* Scrollable Container */}
                    <div className='overflow-y-scroll' style={{height:"12rem"}}>
                        {aims?.map((v, i) => (
                            <AimCard aim={v} aims={aims} index={i} setAims={setAims} />                
                        ))}
                    </div>
                </Card>
            </Card>
            {/* GENERALIZE THE MODAL/FORM PROCESSS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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
                        {/* Page 1*/}
                        {(page === 1) && (
                            <>
                                {/* Goal */}
                                <Form.Group className="mb-3">
                                    <Form.Label>What do we want to accomplish?</Form.Label>
                                    <Form.Control 
                                        as='textarea'
                                        rows={4}
                                        style={{resize:'none'}}
                                        name='goal' 
                                        value={formData.goal}
                                        onChange={handleChange}
                                        isInvalid={!isValid('goal')}
                                        />
                                        {/* Check validity */}
                                        <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                </Form.Group>
                                {/* Population */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Who is this aim for?</Form.Label>
                                    <Form.Control 
                                        as='textarea'
                                        rows={4}
                                        style={{resize:'none'}}
                                        name='population' 
                                        value={formData.population}
                                        onChange={handleChange}
                                        isInvalid={!isValid('population')}
                                        />
                                        {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                </Form.Group>
                            </>
                            )
                        }
                        {/* Page 2 */}
                        {(page === 2) && (
                            <>
                                {/* By number */}
                                <Form.Group className="mb-3">
                                    <Form.Label>By how much do we want to accomplish?</Form.Label>
                                    <Form.Control 
                                        as='textarea'
                                        rows={4}
                                        style={{resize:'none'}}
                                        name='by_num' 
                                        value={formData.by_num}
                                        onChange={handleChange}
                                        isInvalid={!isValid('by_num')}
                                        />
                                    {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                </Form.Group>
                                {/* By Date */}
                                <Form.Group className="mb-3">
                                    <Form.Label>By when will we have accomplished this aim?</Form.Label>
                                    <Form.Control 
                                        type='date'
                                        name='by_date' 
                                        value={formData.by_date}
                                        onChange={handleChange}
                                        isInvalid={!isValid('by_date')}
                                        />
                                    {/* Check validity */}
                                    <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
                                </Form.Group>
                            </>
                            )
                        }
                    </Form>
                </Modal.Body>
                {/* Footer */}
                <Modal.Footer>
                    <ProgressBar 
                        variant='info' 
                        now={page/2*100} 
                        // label={`Page: ${page}`} 
                        style={{width:'10rem'}}
                        />
                    <div className='me-auto'>Page: {page}</div>

                    {/* Page 1 */}
                    {(page === 1) && (
                        <>
                            {/* Close */}
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {/* Next */}
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </>
                        )
                    }
                    {/* Page 2 */}
                    {(page === 2) && (
                        <>
                            {/* Previous */}
                            <Button variant="primary" onClick={handlePrev}>
                                Previous
                            </Button>
                            {/* Create */}
                            <Button form={formId} type='submit' variant="primary">
                                Create
                            </Button>
                        </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}