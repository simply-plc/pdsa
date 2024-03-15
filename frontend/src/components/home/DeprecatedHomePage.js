import {Container} from 'react-bootstrap';


///////////////
// Container //
///////////////

export default function HomePage() {
    
    return <HomePageComponent />;
}

///////////////
// Component //
///////////////

export function HomePageComponent() {
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '80vh'}}>
            <Container>
                <div className='text-center text-primary display-1 mb-3 fw-bold'><b>Simply PLC</b></div>
                <div className='text-center text-secondary fw-bold'>Effective change through continuous learning and collaboration</div>
            </Container>
        </Container>
    );
}