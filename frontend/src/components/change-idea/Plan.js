import {Form, Card, Button, Spinner} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import http from '../../http';



export default function Plan({cycle, changeIdea, setChangeIdea, stageColor, show}) {
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
        http.put(`http://127.0.0.1:8000/api/pdsa/${cycle.id}/`, {...formData})
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
        http.put(`http://127.0.0.1:8000/api/pdsa/${cycle.id}/`, {...formData, stage: 'Do'})
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
        http.put(`http://127.0.0.1:8000/api/pdsa/${cycle.id}/`, {...formData, stage: 'Plan'})
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

    return <PlanComponent 
        handleChange={handleChange} 
        show={show} 
        stageColor={stageColor} 
        formData={formData}
        handleSave={handleSave}
        handleComplete={handleComplete}
        handleRevert={handleRevert}
        loading={loading}
        cycle={cycle}
        />;
}

export function PlanComponent({
    formData, handleChange, show, stageColor,
    handleSave, loading, handleComplete, handleRevert, cycle,
    }) {
    return (
        <>
            {/* Form */}
            <Form className='overflow-scroll flex-grow-1 mb-2'>
                {/* Learning Goal */}
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
                    <Form.Label>What do you want to learn?</Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={4} 
                        style={{resize:'none'}} 
                        name='learning_goal'
                        value={formData?.learning_goal}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Steps */}
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
                    <Form.Label>What steps do you need to test?</Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={4} 
                        style={{resize:'none'}} 
                        name='steps'
                        value={formData?.steps}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Measure */}
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
                    <Form.Label>What data are you going to measure?</Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={4} 
                        style={{resize:'none'}} 
                        name='measure'
                        value={formData?.measure}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* Predictions */}
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
                    <Form.Label>What predictions do you have about the data?</Form.Label>
                    {/* input */}
                    <Form.Control 
                        as='textarea' 
                        rows={4} 
                        style={{resize:'none'}} 
                        name='predictions'
                        value={formData?.predictions}
                        onChange={handleChange}
                        />
                </Form.Group>
                {/* By date */}
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
                            cycle?.stage==='Plan' ?
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