import {Card, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import Hover from '../general/Hover';


///////////////
// Container //
///////////////

export default function SettingsPage() {
    const navigate = useNavigate(); // This is for navigation
    

    // This just returns back
    function handleBackButton() {
        navigate(-1);
    }

    return <SettingsPageComponent 
        handleBackButton={handleBackButton} 
        />
}


///////////////
// Component //
///////////////

export function SettingsPageComponent({
    handleBackButton,
    }) {
    return (
        <>
            <div className=''>
                {/* This is the header section with title and back button and add button */}
                <Card body bg='light' className='border-0'>
                    <div className='d-flex'>
                        {/* This is the back button */}
                        <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton}>
                            <span className='bi-chevron-left text-dark text-center' style={{fontSize: '1.5rem'}} />
                        </Button>
                        {/* This is the title */}
                        <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>Settings</div>
                        {/* Settings */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'10.5rem'}}
                            className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                            // onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Team Settings</span>
                            {/* Plus sign */}
                            <span className='bi-gear-fill fs-5 ms-auto' />
                        </Hover>
                    </div>
                </Card>
                {/* This is the body section */}
                <Card body bg='light' className='border-0'>
                    
                </Card>
            </div>
        </>
    );
}





