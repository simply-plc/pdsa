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
        <div className=''>
            <Card body bg='light' className='border-0'>
                <div className='d-flex'>
                    <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton}>
                        <span className='bi-chevron-left text-dark text-center' style={{fontSize: '1.5rem'}} />
                    </Button>
                    <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>Drivers</div>
                </div>
            </Card>
        </div>
    );
}





