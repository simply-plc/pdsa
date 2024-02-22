import {Card, Dropdown} from 'react-bootstrap';
import axios from 'axios';

import Hover from '../general/Hover';

// GENERALIZE THIS FOR THE DRIVERS TOO!!!!!!
export default function SelectCard({optionName, option, options, index, setOptions, selected, setSelected}) {

    function handleDelete() {
        axios.delete(`http://127.0.0.1:8000/api/${optionName}/${option.id}/`)
            .then(response => {
                // Adds the aim
                if (selected.id === option.id) {
                    setSelected(null);
                }
                options.splice(index, 1);
                setOptions([...options]);
            })
            .catch(error => alert(error.message));
    }

    function handleSelected() {
        if (selected?.id === option.id) {
            setSelected(null);
        } else {
            setSelected(() => option);
        }
    }

    return <SelectCardComponent option={option} handleDelete={handleDelete} handleSelected={handleSelected} selected={selected} />;
}

export function SelectCardComponent({option, selected, handleDelete, handleSelected}) {
    return (
        <>
            <Hover
                comp={Card}
                className='shadow-sm rounded-4 mb-2'
                bg={selected?.id === option.id ? 'info' : 'white'}
                style={{height:"3.5rem", borderColor:selected?.id === option.id ? '#0dcaf0' : '#ffffff', transition: 'border-color .15s ease'}}
                cStyle={{borderColor:'#20c997'}}
                onClick={handleSelected}
                >
                <Card.Body className='d-flex p-0 ps-3 pe-3'>
                    {/* Title */}
                    <div 
                        className='overflow-hidden mt-auto mb-auto w-100' 
                        style={{height:'1.5rem'}}
                        >
                        {option.goal}
                    </div>
                    {/* Menu */}
                    <div className='ms-auto mt-auto mb-auto text-center d-inline-block' style={{width:'3rem'}}>
                        {/* Menu dropdown */}
                        <Dropdown onClick={(e)=>e.stopPropagation()}>
                            {/* Toggle Button */}
                            <Dropdown.Toggle 
                                className='p-0'
                                style={{backgroundColor:'transparent', borderColor:'transparent'}}
                                >
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
                                <Dropdown.Item className='text-danger' onClick={handleDelete}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Body>
            </Hover>

        </>
    );  
}