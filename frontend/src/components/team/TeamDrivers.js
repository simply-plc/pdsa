import {Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Hover from '../general/Hover';
import ModalForm from '../general/ModalForm';
import SelectCard from './SelectCard';



export default function TeamDrivers({team, selectedAim, setSelectedAim, selectedDriver, setSelectedDriver, setSelectedChangeIdea}) {
    /*
        TeamDrivers is just the Drivers card on the UserTeam page
    */
    const [update, setUpdate] = useState(true);
    const [drivers, setDrivers] = useState([]); // Sets the drivers
    const [show, setShow] = useState(); // show or close modal
    const pages = [
        [// Page 1
            {
                label: 'Give your driver a name.',
                name: 'name',
                comp: Form.Control,
            },
            {
                label: 'What aim does the driver affect?',
                name: 'aim',
                comp: Form.Select,
                children: (
                    <>
                        <option value={selectedAim?.id}>{selectedAim?.name}</option>
                        {team?.aims.map((v, i) => (v.id !== selectedAim?.id) ? <option value={v.id}>{v.name}</option> : '')}
                    </>
                ),
            },
            {
                label: 'What needs to be improved?',
                name: 'goal',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
        ],
        [// Page 2
            {
                label: 'How does the driver relate with the aim?',
                name: 'description',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
            {
                label: 'What data do we measure?',
                name: 'measure',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
        ],
    ];

    const initialFormData = { // This is to control the form input
        name: '',
        aim: selectedAim?.id,
        goal: '',
        description: '',
        measure: '',
    };

    // set the drivers for the team
    useEffect(() => {
        const newDrivers = selectedAim?.drivers;
        newDrivers?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        setDrivers(newDrivers) // Set the new drivers
    }, [selectedAim, update]);

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    function handleSave(formData) {
        // Post the new aim
        axios.post('http://127.0.0.1:8000/api/driver/create/', {...formData})
            .then(response => {
                // Adds the aim
                let aim = team.aims.filter((aim) => aim.id === response.data.aim)[0]; // Set the selected aim to have the driver
                aim.drivers.unshift(response.data); // update driver's change ideas
                setSelectedAim(aim); // select the driver
                setUpdate(u => !u); // update
            })
            .catch(error => alert(error.message)); ////////////// NExt step is to create tool tip with preview button
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
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        selectedAim={selectedAim}
        setSelectedChangeIdea={setSelectedChangeIdea}
        />
}


export function TeamDriversComponent({
    handleSave, handleOpenModal,
    show, setShow, initialFormData, pages, setDrivers, drivers,
    selectedDriver, setSelectedDriver, selectedAim, setSelectedChangeIdea,
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
                            cStyle={{width:'8.5rem'}}
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
                            <div className='overflow-y-auto h-100 p-1'>
                                {
                                    (!drivers) ? <div className='text-muted text-center'>Select an aim first</div> :
                                    (drivers?.length === 0) ? <div className='text-muted text-center'>Add a driver first</div> :
                                    drivers?.map((v, i) => (
                                        <SelectCard 
                                            optionName='driver' 
                                            option={v} 
                                            optionShow={v.name}
                                            options={drivers} 
                                            index={i} 
                                            setOptions={setDrivers} 
                                            selected={selectedDriver} 
                                            setSelected={setSelectedDriver} 
                                            pages={pages}
                                            parent={selectedAim}
                                            setChild={setSelectedChangeIdea}
                                            />
                                        ))
                                }
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