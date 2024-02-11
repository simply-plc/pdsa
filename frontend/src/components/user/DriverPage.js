import {Card, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';




///////////////
// Container //
///////////////

export default function DriverPage() {
    const navigate = useNavigate();

    function handleBackButton() {
        navigate(-1);
    }

    return <DriverPageComponent handleBackButton={handleBackButton} />
}


///////////////
// Component //
///////////////

export function DriverPageComponent({handleBackButton}) {
    return (
        <div className='m-3'>
            <Card body bg='light' className='border-0'>
                <Button className='me-5' variant='light' onClick={handleBackButton}>
                    <i className='bi-chevron-left text-dark' style={{webkitTextStroke: '.1rem'}} />
                </Button>
                <div className='h1 fw-bold d-inline-block align-middle'>Drivers</div>
            </Card>
        </div>
    );
}





