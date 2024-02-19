import {Card, Dropdown} from 'react-bootstrap';
import axios from 'axios';

import Hover from '../general/Hover';

// GENERALIZE THIS FOR THE DRIVERS TOO!!!!!!
export default function AimCard({aim, aims, index, setAims}) {

    function handleDeleteAim() {
        axios.delete(`http://127.0.0.1:8000/api/aim/${aim.id}/`)
            .then(response => {
                // Adds the aim
                aims.splice(index, 1);
                setAims([...aims]);
            })
            .catch(error => alert(error.message));
    }

    return <AimCardComponent aim={aim} handleDeleteAim={handleDeleteAim} />;
}

export function AimCardComponent({aim, handleDeleteAim}) {
    return (
        <>
            <Hover
                comp={Card}
                className='shadow-sm rounded-4 mb-2'
                style={{height:"3.5rem", borderColor:'#ffffff', transition: 'border-color .15s ease'}}
                cStyle={{borderColor:'#20c997'}}
                >
                <Card.Body className='d-flex p-0 ps-3 pe-3'>
                    {/* Title */}
                    <div 
                        className='overflow-hidden mt-auto mb-auto w-100' 
                        style={{height:'1.5rem'}}
                        >
                        {aim.goal}
                    </div>
                    {/* Menu */}
                    <div className='ms-auto mt-auto mb-auto text-center d-inline-block' style={{width:'3rem'}}>
                        {/* Menu dropdown */}
                        <Dropdown onClick={(e)=>e.stopPropagation()}>
                            {/* Toggle Button */}
                            <Dropdown.Toggle className='bg-white border-white p-0'>
                                <Hover 
                                    comp={(props)=><span {...props} />} 
                                    style={{fontSize:'1.1rem', cursor:'pointer'}}
                                    cStyle={{fontSize:'1.3rem'}}
                                    className='bi-three-dots-vertical text-dark' 
                                    />
                            </Dropdown.Toggle>
                            {/* Menu */}
                            <Dropdown.Menu variant="dark">
                                {/* Edit */}
                                <Dropdown.Item>Edit</Dropdown.Item>
                                {/* Delete */}
                                <Dropdown.Item className='text-danger' onClick={handleDeleteAim}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Body>
            </Hover>

        </>
    );  
}