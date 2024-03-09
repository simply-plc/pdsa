import {Card, Row, Col, Badge} from 'react-bootstrap';



export default function Info({aim, driver, changeIdea}) {

    return <InfoComponent aim={aim} driver={driver} changeIdea={changeIdea} />;
}

export function InfoComponent({aim, driver, changeIdea}) {
    return (
        <>
            <div className='pb-2' style={{height: '25%'}}>
                {/* Aim */}
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body className='d-flex flex-column overflow-hidden'> {/* this overflow is broken */}
                        {/* Title Badge */}
                        <div className='h4 text-primary fw-bold'>
                            <Badge bg="primary" className='rounded-5 text-white me-3 mb-2'>Change Idea</Badge>
                            {changeIdea?.name}
                        </div>
                        {/* Body */}
                        <div className='m-0 flex-grow-1 overflow-auto'>
                            <div className='fw-bold'>What change do you want to make?</div>
                            <div className='ms-2 text-muted'>{changeIdea?.idea}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* Driver */}
            <div className='pt-2 mb-2' style={{height: '75%'}}>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body className='d-flex flex-column overflow-hidden'>
                        {/* Title Badge */}
                        <div className='h4 text-primary fw-bold'>
                            <Badge bg="primary" className='rounded-5 text-white me-3 mb-2'>Driver</Badge>
                            {driver.name}
                        </div>
                        {/* Body */}
                        <div className='flex-grow-1 h-100 overflow-hidden'>
                            {/* Goal */}
                            <div className='overflow-auto' style={{height:'33%'}}>
                                <div className='fw-bold'>What needs to be improved?</div>
                                <div className='ms-2 text-muted'>{driver.goal}</div>
                            </div>
                            {/* Population */}
                            <div className='overflow-auto' style={{height:'33%'}}>
                                <div className='fw-bold'>How does the driver relate with the aim?</div>
                                <div className='ms-2 text-muted'>{driver.description}</div>
                            </div>
                            {/* By num */}
                            <div className='overflow-auto' style={{height:'33%'}}>
                                <div className='fw-bold'>What data do we measure?</div>
                                <div className='ms-2 text-muted'>{driver.measure}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}