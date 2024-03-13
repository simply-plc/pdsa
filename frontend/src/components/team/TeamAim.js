import {Card, Badge, Dropdown, Form} from 'react-bootstrap';
import {useState, useRef, useEffect} from 'react';

import Hover from '../general/Hover';
import http from '../../http';


export default function TeamAim({team, setUpdate}) {
    const [aim, setAim] = useState('');
    const textRef = useRef();

    useEffect(() => setAim(team?.aim), [team])

    function handleChange({target}) {
        setAim(target.value);
    }

    function handleFocus() {
        textRef.current?.focus();
    }

    function handleBlur() {
        http.patch(`/api/user-team/${team.id}/`, {aim: aim})
            .then(response => setUpdate(u => !u));
    }

    return <TeamAimComponent 
        aim={aim} 
        handleChange={handleChange} 
        handleFocus={handleFocus} 
        handleBlur={handleBlur} 
        textRef={textRef}
        />;
}

export function TeamAimComponent({aim, handleChange, handleFocus, handleBlur, textRef}) {
    return (
        <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
            <Card.Body className='d-flex flex-column overflow-hidden'> {/* this overflow is broken */}
                {/* Title Badge */}
                <div className='h4 text-primary fw-bold d-flex'>
                    <Badge bg="primary" className='rounded-5 text-white mb-1 mt-1'>Aim</Badge>
                    {/* Menu */}
                    <div className='ms-auto mt-auto mb-auto text-center d-inline-block' style={{width:'2rem'}}>
                        {/* Menu dropdown */}
                        <Dropdown onClick={(e)=>e.stopPropagation()}>{/* stops the item selection to change */}
                            {/* Toggle Button */}
                            <Dropdown.Toggle 
                                className='p-0'
                                style={{backgroundColor:'transparent', borderColor:'transparent'}}
                                >
                                {/* Three dots */}
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
                                <Dropdown.Item onClick={handleFocus}>Edit</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {/* Body */}
                <div className='flex-grow-1 d-flex flex-column'>
                    <div className='fw-bold'>
                        What is the aim of your team?
                    </div>
                    <div className='flex-grow-1'>
                        <Form.Control 
                            ref={textRef}
                            as="textarea"
                            rows={1}
                            className='w-100 border-0 h-100'
                            name='aim' 
                            value={aim} 
                            onChange={handleChange} 
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={{resize:'none'}}
                            />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}