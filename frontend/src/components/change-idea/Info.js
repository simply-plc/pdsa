import {Card, Row, Col, Badge} from 'react-bootstrap';



export default function Info({aim, driver}) {

    return <InfoComponent aim={aim} driver={driver} />;
}

export function InfoComponent({aim, driver}) {
    return (
        <>
            <div className='pb-2 h-50'>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body className='d-flex flex-column overflow-auto'> {/* this overflow is broken */}
                        {/* Title Badge */}
                        <div className='h4 text-primary fw-bold'>
                            <Badge bg="primary" className='rounded-5 text-white me-3'>Aim</Badge>
                            {aim.name}
                        </div>
                        <Row className='m-0 h-100 flex-grow-1'>
                            <Col lg={6}>
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>What do we want to accomplish?</div>
                                        <div className='ms-2 text-muted'>{aim.goal}</div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>Who is this aim for?</div>
                                        <div className='ms-2 text-muted'>{aim.population}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                {/* Second Column */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>Who is this aim for?</div>
                                        <div className='ms-2 text-muted'>{aim.population}</div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>Who is this aim for?</div>
                                        <div className='ms-2 text-muted'>{aim.population}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            <div className='pt-2 h-50'>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body>
                        <div className='h4 text-primary fw-bold'>Driver</div>
                        <Row className='m-0'>
                            <Col>
                                hi
                            </Col>
                            <Col>
                                bye
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}