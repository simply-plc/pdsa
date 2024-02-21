import {Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Hover from '../general/Hover';
import ModalForm from '../general/ModalForm';
import SelectCard from './SelectCard';



export default function TeamDrivers({team}) {
    const [drivers, setDrivers] = useState(); // Sets the aim
    const [show, setShow] = useState(); // show or close modal
    const pages = [
        [// Page 1
            {
                label: 'What aim does the driver affect?',
                name: 'aim',
                as: 'textarea',
            },
            {
                label: 'What needs to be improved?',
                name: 'goal',
                as: 'textarea',
            },
            {
                label: 'How does it relate with the aim?',
                name: 'description',
                as: 'textarea',
            },
        ],
        [// Page 2
            {
                label: 'What data do we measure?',
                name: 'measure',
                as: 'textarea',
            },
        ],
    ];
    const initialFormData = { // This is to control the form input
        aim: '',
        goal: '',
        description: '',
        measure: '',
    };

    // set the drivers for the team
    useEffect(() => {
        const newDrivers = team?.aims.reduce((acc, curr) => {
            acc = [...acc, ...curr.drivers];
            return acc;
        }, []);

        // alert(JSON.stringify(team?.aims))
        newDrivers?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        alert(JSON.stringify(newDrivers))
        setDrivers(newDrivers)
    }, [team]);

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    async function handleSave(formData) {
        // Post the new aim
        axios.post('http://127.0.0.1:8000/api/drivers/create/', {...formData})
            .then(response => {
                // Adds the aim
                drivers.unshift(response.data);
                setDrivers([...drivers]);
            })
            .catch(error => alert(error.message));
    }

    return <TeamDriversComponent
        show={show}
        setShow={setShow}
        pages={pages}
        handleOpenModal={handleOpenModal}
        handleSave={handleSave}
        initialFormData={initialFormData}
        setDrivers={setDrivers}
        drivers={drivers}
        />
}


export function TeamDriversComponent({
    handleSave, handleOpenModal,
    show, setShow, initialFormData, pages, setDrivers, drivers
    }) {
    return (
        <>
            {/* Card */}
            <Card className='border-0 shadow-sm rounded-4'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Header */}
                    <div className="d-flex">
                        {/* Title */}
                        <div className='h2'>Drivers</div>
                        {/* Add button */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'7.5rem'}}
                            className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                            onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Driver</span>
                            {/* Plus sign */}
                            <span className='bi-plus-lg fs-5 ms-auto' />
                        </Hover>
                    </div>
                    {/* Body */}
                    <Card className='border-0 bg-light mt-2 rounded-4 flex-grow-1' style={{minHeight:'0'}}>
                        <Card.Body className='h-100'>
                            {/* Scrollable Container */}
                            <div className='overflow-y-auto h-100'>
                                {drivers?.map((v, i) => (
                                    <SelectCard optionName='driver' option={v} options={drivers} index={i} setOptions={setDrivers} />                
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Modal */}
            <ModalForm title={'Add Driver'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={initialFormData} />
        </>
    );
}