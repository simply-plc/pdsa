import {Card} from 'react-bootstrap';



export default function Cycles() {

    return <CyclesComponent />;
}

export function CyclesComponent() {
    return (
        <>
            <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                <Card.Body>
                    Cycles
                </Card.Body>
            </Card>
        </>
    );
}