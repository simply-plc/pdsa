import {Form, Card, Button, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import http from '../../http';
import CustomToolTip from '../general/CustomToolTip';



export default function Study({cycle, changeIdea, setChangeIdea, stageColor, show}) {
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
        http.put(`/api/pdsa/${cycle.id}/`, {...formData, stage: 'Act'})
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
        http.put(`/api/pdsa/${cycle.id}/`, {...formData, stage: 'Study'})
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
    const tooltipBodyOutcome = (
        <div className='text-muted'>
            Outcome Data is the measured data from implementing the change.
        </div>
    );

    // This is the tooltip body
    const tooltipBodyBalance = (
        <div className='text-muted'>
            Balance Data is the data collected from possible unintended impacts of the change.
        </div>
    );

    return <StudyComponent 
        handleChange={handleChange} 
        show={show} 
        stageColor={stageColor} 
        formData={formData}
        handleSave={handleSave}
        handleComplete={handleComplete}
        handleRevert={handleRevert}
        loading={loading}
        cycle={cycle}
        tooltipBodyOutcome={tooltipBodyOutcome}
        tooltipBodyBalance={tooltipBodyBalance}
        />;
}

export function StudyComponent({
    formData, handleChange, show, stageColor,
    handleSave, loading, handleComplete, handleRevert, cycle,
    tooltipBodyOutcome, tooltipBodyBalance,
    }) {
    return (
        <>
            {/* Form */}
            <Form className='overflow-scroll flex-grow-1 mb-2'>
                {/* Outcome Measure */}
                <Form.Group 
                    as={Card} 
                    body 
                    className='rounded-4 border-0 shadow-sm fw-bold mb-3' 
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
                        <span>Outcome Data</span>
                        {/* Tool tip */}
                        <CustomToolTip placement={'right'} body={tooltipBodyOutcome}> 
                            <span className='ms-2 bi-question-circle text-info' style={{fontSize:'.9rem'}} />
                        </CustomToolTip>
                    </Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={2} 
                        style={{resize:'none'}} 
                        name='o_measure'
                        value={formData?.o_measure}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Outcome Measure */}
                <Form.Group 
                    as={Card} 
                    body 
                    className='rounded-4 border-0 shadow-sm fw-bold mb-3' 
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
                        <span>Balance Data</span>
                        {/* Tool tip */}
                        <CustomToolTip placement={'right'} body={tooltipBodyBalance}> 
                            <span className='ms-2 bi-question-circle text-info' style={{fontSize:'.9rem'}} />
                        </CustomToolTip>
                    </Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={2} 
                        style={{resize:'none'}} 
                        name='b_measure'
                        value={formData?.b_measure}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Learning */}
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
                    <Form.Label>What did you learn from the data you collected?</Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={7} 
                        style={{resize:'none'}} 
                        name='learning'
                        value={formData?.learning}
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
                            cycle?.stage==='Study' ?
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