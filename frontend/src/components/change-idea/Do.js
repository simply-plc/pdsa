import {Form, Card, Button, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import http from '../../http';
import CustomToolTip from '../general/CustomToolTip';


export default function Do({cycle, changeIdea, setChangeIdea, stageColor, show}) {
    const [formData, setFormData] = useState(cycle); // Form data
    const [loading, setLoading] = useState(false); // For showing loading or saved when saving

    // Initialize data
    useEffect(() => {
        setFormData(cycle);
        setLoading(false);
    }, [cycle]);

    // If another stage is selected, reset loading
    useEffect(() => {
        setLoading(false);
    }, [show]);

    // handles controlling the input
    function handleChange({target}) {
        // This controls the form input
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        setLoading(false); // Reset loading 
    }

    // Saving the form
    function handleSave() {
        setLoading('loading');
        // Update
        http.put(`/api/pdsa/${cycle.id}/`, {...formData})
            .then(response => {
                // uodates the cycle
                for (let key in response.data) {
                    cycle[key] = response.data[key];
                }

                setFormData(response.data); // set new form
                setLoading('saved'); // Show that it is saved
            })
            .catch(error => alert(error.message)); // Implement a failed to save
    }

    // Save and move on to next stage
    function handleComplete() {
        setLoading('loading');
        // Update
        http.put(`/api/pdsa/${cycle.id}/`, {...formData, stage: 'Study'})
            .then(response => {
                // updates the cycle
                for (let key in response.data) {
                    cycle[key] = response.data[key];
                }

                setChangeIdea({...changeIdea}) // Resets the whole page
                setFormData(response.data);
                setLoading('saved');
            })
            .catch(error => alert(error.message)); // Implement a failed to save
    }

    // Save and revert to current stage
    function handleRevert() {
        setLoading('loading');
        // Update
        http.put(`/api/pdsa/${cycle.id}/`, {...formData, stage: 'Do'})
            .then(response => {
                // updates the cycle
                for (let key in response.data) {
                    cycle[key] = response.data[key];
                }

                setChangeIdea({...changeIdea})
                setFormData(response.data);
                setLoading('saved');
            })
            .catch(error => alert(error.message));
    }

    // This is the tooltip body
    const tooltipBody = (
        <div className='text-muted'>
            Process Data is data collected to verify that the process is implemented to fidelity.
        </div>
    );

    return <DoComponent 
        handleChange={handleChange} 
        show={show} 
        stageColor={stageColor} 
        formData={formData}
        handleSave={handleSave}
        handleComplete={handleComplete}
        handleRevert={handleRevert}
        loading={loading}
        cycle={cycle}
        tooltipBody={tooltipBody}
        />;
}

export function DoComponent({
    formData, handleChange, show, stageColor,
    handleSave, loading, handleComplete, handleRevert, cycle, tooltipBody
    }) {
    return (
        <>
            {/* Form */}
            <Form className='overflow-scroll flex-grow-1 mb-2'>
                {/* By date */}
                <Form.Group 
                    as={Card} 
                    body 
                    className='mb-3 rounded-4 border-0 shadow-sm fw-bold' 
                    style={{
                        color:stageColor,
                        opacity:show ? 1 : 0, 
                        zIndex: show ? 1 : 0,
                        transition: 'all .5s ease-out',
                        top: show ? '0rem' : '1rem',
                    }}
                    >
                    <Form.Label>When are you going to test the change idea?</Form.Label>
                    {/* Input */}
                    <Form.Control 
                        as='input' 
                        type='date' 
                        name='by_date' 
                        value={formData?.by_date}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Process Measure */}
                <Form.Group 
                    as={Card} 
                    body 
                    className='rounded-4 border-0 shadow-sm fw-bold' 
                    style={{
                        color:stageColor,
                        opacity:show ? 1 : 0, 
                        zIndex: show ? 1 : 0,
                        transition: 'all .5s ease-out',
                        top: show ? '0rem' : '1rem',
                    }}
                    >
                    {/* Title */}
                    <Form.Label>
                        <span>Process Data</span>
                        {/* Tool tip */}
                        <CustomToolTip placement={'right'} body={tooltipBody}> 
                            <span className='ms-2 bi-question-circle text-info' style={{fontSize:'.9rem'}} />
                        </CustomToolTip>
                    </Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={12} 
                        style={{resize:'none'}} 
                        name='p_measure'
                        value={formData?.p_measure}
                        onChange={handleChange}
                        />
                </Form.Group>
            </Form>
            {/* Buttons */}
            <div className='ms-auto d-flex align-items-center'>
                {
                    loading==='loading' ? <Spinner size='sm' variant='primary' animation='grow' className='me-2' /> :
                    loading==='saved' ? <span className='text-light me-2'>Saved!</span> : ''
                }
                <Card className='rounded-4 d-inline-block'>
                    <Card.Body className='p-1 d-flex'>
                        <Button 
                            variant='outline-secondary' 
                            className={`rounded-4 me-2 fw-bold shadow-sm pe-2 ps-2 pt-0 pb-0`}
                            onClick={handleSave}
                            >
                            Save
                        </Button>
                        {
                            cycle?.stage==='Do' ?
                            <Button 
                                variant='outline-primary' 
                                className='rounded-4 fw-bold shadow-sm pe-2 ps-2 pt-0 pb-0'
                                onClick={handleComplete}
                                >
                                Complete
                            </Button> :
                            <Button 
                                variant='outline-danger' 
                                className='rounded-4 fw-bold shadow-sm pe-2 ps-2 pt-0 pb-0'
                                onClick={handleRevert}
                                >
                                Revert
                            </Button>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}