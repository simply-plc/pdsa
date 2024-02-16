import {Card} from 'react-bootstrap';

import Hover from '../general/Hover';



export default function TeamDrivers() {
    return <TeamDriversComponent />
}


export function TeamDriversComponent() {
    return (
        <Card body className='border-0 shadow-sm h-100'>
            {/* Header */}
            <div className="d-flex">
                {/* Title */}
                <div className='h2'>Drivers</div>
                {/* Add button */}
                <Hover 
                    comp={(props)=><span {...props}></span>}
                    style={{width:'3rem', transition: 'width .2s ease'}}
                    cStyle={{width:'8.5rem'}}
                    className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                    // onClick={(handleOpenModal)}
                    >
                    {/* Hidden text; show on hover */}
                    <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Driver</span>
                    {/* Plus sign */}
                    <span className='bi-plus-lg fs-5 ms-auto' />
                </Hover>
            </div>
            {/* body */}
            <Card body className='border-0 bg-light mt-2' style={{height:"82%"}}>
                hi
            </Card>
        </Card>
    );
}