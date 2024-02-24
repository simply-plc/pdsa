import {Card} from 'react-bootstrap';



export default function Info() {

    return <InfoComponent />;
}

export function InfoComponent() {
    return (
        <>
            <div className='pb-2 h-50'>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body>
                        Aim
                    </Card.Body>
                </Card>
            </div>
            <div className='pt-2 h-50'>
                <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                    <Card.Body>
                        Driver
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}