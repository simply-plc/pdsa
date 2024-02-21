import {Modal, Form, Button, ProgressBar} from 'react-bootstrap';
import {useState, useId} from 'react';

export default function ModalForm({title, show, setShow, onSave, pages, initialFormData}) {
    /* 
        pages = [
            [ GENERALIZE FOR ANY Component like Form.Control or Form.Select
                {
                    label: '1',
                    name: '1',
                    comp: ObjectComponent // new
                    children: list of html // new
                    as: 'textarea'
                },
                {
                    label: '2',
                    name: '2',
                    comp: ObjectComponent // new
                    children: list of html // new
                    as: 'input'
                },
            ],
            [
                {
                    label: '3',
                    name: '3',
                    comp: ObjectComponent // new
                    children: list of html // new
                    as: 'textarea'
                },
                {
                    label: '4',
                    name: '4',
                    comp: ObjectComponent // new
                    children: list of html // new
                    as: 'input',
                    type: 'date'
                },
            ],
        ];
     */
    const formId = useId(); // Sets form id so button can access without being in the form
    const [page, setPage] = useState(1); // Sets the current page
    const initialRequired = Object.keys(initialFormData).reduce((acc, curr) => { // Set the reset initial value for required
        acc[curr] = false;
        return acc;
    }, {});
    const [required, setRequired] = useState({...initialRequired}); // Checks that all required inputs are entered
    const [formData, setFormData] = useState({...initialFormData}); // Sets the form data

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

    // This handles closing create modal
    function handleCloseModal() {
        setFormData({...initialFormData}); // resets form data
        setRequired({...initialRequired}); // resets required data
        setPage(1); // Resets the page
        setShow(false); // Close modal
    }

    // Handles going to next page
    function handleNext(event) {
        event.preventDefault();
        event.stopPropagation();

        // Checks validity
        let currPage = pages[page-1];
        const validList = [];
        for (let i = 0; i < currPage.length; i++) { // Iterates and checks if inputs are filled, if not, then alert user
            let currGroup = currPage[i];
            validList.push(isValid(currGroup.name, true));
        }

        if (!validList.every(Boolean)) { // Checks if all the inputs are filled
            return;
        }

        setPage(() => page + 1);
    }

    // Handles going to prev page
    function handlePrev(event) {
        event.preventDefault();
        event.stopPropagation();

        setPage(() => page - 1);
    }

    function handleSaveModal(event) {
        // This stops the typical default form submit rerendering stuff
        event.preventDefault();
        event.stopPropagation();

        // Checks validity
        let currPage = pages[page-1];
        const validList = [];
        for (let i = 0; i < currPage.length; i++) { // Iterates and checks if inputs are filled, if not, then alert user
            let currGroup = currPage[i];
            validList.push(isValid(currGroup.name, true));
        }

        if (!validList.every(Boolean)) { // Checks if all the inputs are filled
            return;
        }

        onSave(formData);

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
        title={title}
        show={show}
        formId={formId}
        formData={formData}
        handleCloseModal={handleCloseModal}
        handleChange={handleChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSaveModal={handleSaveModal}
        isValid={isValid}
        page={page}
        pages={pages}
        />
}


export function TeamAimComponent({
    handleCloseModal, handleChange, handleSaveModal, handleNext, handlePrev,
    show, formId, formData, title,
    isValid, page, pages,
    }) {

    let currPage = pages[page-1]; // Current page
    let currFormPage = []; // Current form page

    for (let j = 0; j < currPage.length; j++) { // Iterate through the form groups
        let currGroup = currPage[j]; // Current group on page
        // Adds a form group to the form page
        currFormPage.push( 
            <Form.Group className="mb-3">
                <Form.Label>{currGroup.label}</Form.Label>
                <Form.Control 
                    as={currGroup.as}
                    rows={4}
                    type={currGroup.type}
                    style={{resize:'none'}}
                    name={currGroup.name} 
                    value={formData[currGroup.name]}
                    onChange={handleChange}
                    isInvalid={!isValid(currGroup.name)}
                    />
                    {/* Check validity */}
                <Form.Control.Feedback type='invalid'>Required</Form.Control.Feedback>
            </Form.Group>
        ); 
    }

    let currButtonGroup; // One page only
    if (pages.length === 1) {
        currButtonGroup = (
            <>
                {/* Close */}
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                {/* Create */}
                <Button form={formId} type='submit' variant="primary">
                    Create
                </Button>
            </>
        );
    } else if (page === 1) { // Initial Page
        currButtonGroup = (
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
        );
    } else if (page === pages.length) { // Last Page
        currButtonGroup = (
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
        );
    } else { // In between page
        currButtonGroup = (
            <>
                {/* Previous */}
                <Button variant="primary" onClick={handlePrev}>
                    Previous
                </Button>
                {/* Next */}
                <Button variant="primary" onClick={handleNext}>
                    Next
                </Button>
            </>
        );
    }

    return (
        <Modal show={show} fullscreen='md-down' scrollable={true} onHide={handleCloseModal}>
            {/* Header */}
            <Modal.Header closeButton>
                {/* Title */}
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {/* Body */}
            <Modal.Body>
                {/* Form */}
                <Form id={formId} onSubmit={handleSaveModal} validated={false} noValidate>
                    {currFormPage}
                </Form>
            </Modal.Body>
            {/* Footer */}
            <Modal.Footer>
                <ProgressBar 
                    variant='info' 
                    now={page/pages.length*100} 
                    // label={`Page: ${page}`} 
                    style={{width:'10rem'}}
                    />
                <div className='me-auto'>Page: {page}</div>
                {currButtonGroup}
            </Modal.Footer>
        </Modal>
    );
}