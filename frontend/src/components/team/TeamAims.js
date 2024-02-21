import {Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Hover from '../general/Hover';
import SelectCard from './SelectCard';
import ModalForm from '../general/ModalForm';



export default function TeamAim({team}) {
    const [aims, setAims] = useState(); // Sets the aim
    const [show, setShow] = useState(); // show or close modal
    const pages = [
        [// Page 1
            {
                label: 'What do we want to accomplish?',
                name: 'goal',
                as: 'textarea',
                comp: Form.Control,
            },
            {
                label: 'Who is this aim for?',
                name: 'population',
                as: 'textarea',
                comp: Form.Control,
            },
        ],
        [// Page 2
            {
                label: 'By how much do we want to accomplish?',
                name: 'by_num',
                as: 'textarea',
                comp: Form.Control,
            },
            {
                label: 'By when will we have accomplished this aim?',
                name: 'by_date',
                as: 'input',
                type: 'date',
                comp: Form.Control,
            },
        ],
    ];
    const initialFormData = { // This is to control the form input
        goal: '',
        population: '',
        by_num: '',
        by_date: '',
    };

    // set the aims for the team
    useEffect(() => {
        const newAims = team?.aims;
        newAims?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        setAims(newAims)
    }, [team]);

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    async function handleSave(formData) {
        // Post the new aim
        axios.post('http://127.0.0.1:8000/api/aim/create/', {...formData, team: team.id})
            .then(response => {
                // Adds the aim
                aims.unshift(response.data);
                setAims([...aims]);
            })
            .catch(error => alert(error.message));
    }

    return <TeamAimComponent 
        show={show}
        setShow={setShow}
        initialFormData={initialFormData}
        handleOpenModal={handleOpenModal}
        handleSave={handleSave}
        pages={pages}
        aims={aims}
        setAims={setAims}
        />
}


export function TeamAimComponent({
    handleSave, handleOpenModal,
    show, setShow, initialFormData,
    pages, aims, setAims,
    }) {
    return (
        <>
            {/* Card */}
            <Card className='border-0 shadow-sm rounded-4'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Header */}
                    <div className="d-flex">
                        {/* Title */}
                        <div className='h2'>Aims</div>
                        {/* Add button */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'7.5rem'}}
                            className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                            onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Aim</span>
                            {/* Plus sign */}
                            <span className='bi-plus-lg fs-5 ms-auto' />
                        </Hover>
                    </div>
                    {/* Body */}
                    <Card className='border-0 bg-light mt-2 rounded-4 flex-grow-1' style={{minHeight:'0'}}>
                        <Card.Body className='h-100'>
                            {/* Scrollable Container */}
                            <div className='overflow-y-auto h-100'>
                                {aims?.map((v, i) => (
                                    <SelectCard optionName='aim' option={v} options={aims} index={i} setOptions={setAims} />                
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Modal */} 
            <ModalForm title={'Add Aim'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={initialFormData} />
        </>
    );
}