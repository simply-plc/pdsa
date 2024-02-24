import {Card} from 'react-bootstrap';



export default function PDSA() {

    return <PDSAComponent />;
}


export function PDSAComponent() {
    return (
        <>
            {/* Card */}
            <Card className='border-0 shadow-sm rounded-4 h-100'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Body */}
                    <Card className='border-0 bg-light mt-2 rounded-4 flex-grow-1' style={{minHeight:'0'}}>
                        <Card.Body className='h-100'>
                            {/* Scrollable Container */}
                            <div className='overflow-y-auto h-100 p-1'>
                                hi
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    );
}