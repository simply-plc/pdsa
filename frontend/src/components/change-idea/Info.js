import {Card, Row, Col, Badge} from 'react-bootstrap';



export default function Info({aim, driver, changeIdea}) {

    return <InfoComponent aim={aim} driver={driver} changeIdea={changeIdea} />;
}

export function InfoComponent({aim, driver, changeIdea}) {
    return (
        <>
            <div className='pb-2 h-50'>
                {/* Aim */}
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body className='d-flex flex-column overflow-hidden'> {/* this overflow is broken */}
                        {/* Title Badge */}
                        <div className='h4 text-primary fw-bold'>
                            <Badge bg="primary" className='rounded-5 text-white me-3'>Aim</Badge>
                            {aim.name}
                        </div>
                        {/* Body */}
                        <Row className='m-0 h-100 flex-grow-1 overflow-scroll'>
                            {/* First Col */}
                            <Col lg={6}>
                                {/* Goal */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>What do we want to accomplish?</div>
                                        <div className='ms-2 text-muted'>{aim.goal}</div>
                                    </div>
                                </div>
                                {/* Population */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>Who is this aim for?</div>
                                        <div className='ms-2 text-muted'>{aim.population}</div>
                                    </div>
                                </div>
                            </Col>
                            {/* Second Col*/}
                            <Col lg={6}>
                                {/* By num */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>By how much do we want to accomplish?</div>
                                        <div className='ms-2 text-muted'>{aim.by_num}</div>
                                    </div>
                                </div>
                                {/* By date */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>By when will we have accomplished this aim?</div>
                                        <div className='ms-2 text-muted'>{new Date(aim.by_date).toDateString()}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            {/* Driver */}
            <div className='pt-2 mb-2 h-50'>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body className='d-flex flex-column overflow-hidden'>
                        {/* Title Badge */}
                        <div className='h4 text-primary fw-bold'>
                            <Badge bg="primary" className='rounded-5 text-white me-3'>Driver</Badge>
                            {driver.name}
                        </div>
                        {/* Body */}
                        <Row className='m-0 h-100 flex-grow-1 overflow-scroll'>
                            {/* First Col */}
                            <Col lg={6}>
                                {/* Goal */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>What needs to be improved?</div>
                                        <div className='ms-2 text-muted'>{driver.goal}</div>
                                    </div>
                                </div>
                                {/* Population */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>How does the driver relate with the aim?</div>
                                        <div className='ms-2 text-muted'>{driver.description}</div>
                                    </div>
                                </div>
                            </Col>
                            {/* Second Col*/}
                            <Col lg={6}>
                                {/* By num */}
                                <div className='d-flex align-items-center' style={{height:'50%'}}>
                                    <div>
                                        <div className='fw-bold'>What data do we measure?</div>
                                        <div className='ms-2 text-muted'>{driver.measure}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}