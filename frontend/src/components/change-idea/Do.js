import {Form, Card, Button} from 'react-bootstrap';



export default function Do({stageColor, show}) {

    return <DoComponent show={show} stageColor={stageColor} />;
}

export function DoComponent({show, stageColor,}) {
    return (
        <>
            {/* Form */}
            <Form className='overflow-scroll flex-grow-1 mb-2'>
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
                    <Form.Control as='textarea' rows={4} style={{resize:'none'}} name='learning_goal' />
                </Form.Group>
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
                    <Form.Control as='textarea' rows={4} style={{resize:'none'}} name='steps' />
                </Form.Group>
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
                    <Form.Control as='textarea' rows={4} style={{resize:'none'}} name='measure' />
                </Form.Group>
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
                    <Form.Control as='textarea' rows={4} style={{resize:'none'}} name='predictions' />
                </Form.Group>
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
                    <Form.Control as='input' type='date' name='by_date' />
                </Form.Group>
            </Form>
            {/* Button */}
            <Card className='rounded-4 ms-auto'>
                <Card.Body className='p-1 d-flex'>
                    <Button 
                        variant='outline-secondary' 
                        className='rounded-4 me-2 fw-bold shadow-sm pe-2 ps-2 pt-0 pb-0'
                        >
                        Save
                    </Button>
                    <Button 
                        variant='outline-primary' 
                        className='rounded-4 fw-bold shadow-sm pe-2 ps-2 pt-0 pb-0'
                        >
                        Complete
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}