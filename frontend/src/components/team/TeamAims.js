import {Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import http from '../../http';
import Hover from '../general/Hover';
import SelectCard from './SelectCard';
import ModalForm from '../general/ModalForm';



export default function TeamAim({team, selectedAim, setSelectedAim, setSelectedDriver}) {
    /*
        TeamAim is just the Aim card on the UserTeam page
    */
    const [aims, setAims] = useState(); // Sets the aim
    const [show, setShow] = useState(); // show or close modal
    const [update, setUpdate] = useState(false);
    const pages = [
        [// Page 1
            {
                label: 'Give your aim a name.',
                name: 'name',
                comp: Form.Control,
            },
            {
                label: 'What do we want to accomplish?',
                name: 'goal',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
        ],
        [// Page 2
            {
                label: 'Who is this aim for?',
                name: 'population',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
            {
                label: 'By how much do we want to accomplish?',
                name: 'by_num',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
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
        name: '',
        goal: '',
        population: '',
        by_num: '',
        by_date: '',
    };

    // set the aims for the team
    useEffect(() => {
        team?.aims.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date));
        // const newAims = team?.aims;
        // newAims?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        setAims(team?.aims);
    }, [team, update]);

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    function handleSave(formData) {
        // Post the new aim
        http.post('/api/aim/create/', {...formData, team: team.id})
            .then(response => {
                // Adds the aim
                aims.unshift(response.data)
                setUpdate(u=>!u);
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
        selectedAim={selectedAim} 
        setSelectedAim={setSelectedAim} 
        setSelectedDriver={setSelectedDriver}
        setUpdate={setUpdate}
        />
}


export function TeamAimComponent({
    handleSave, handleOpenModal,
    show, setShow, initialFormData,
    pages, aims, setAims, selectedAim, setSelectedAim, setSelectedDriver, setUpdate,
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
                            <div className='overflow-y-auto h-100 p-1'>
                                {
                                    (aims?.length === 0) ? <div className='text-muted text-center'>Add an aim</div> :
                                    aims?.map((v, i) => (
                                        <SelectCard 
                                            pages={pages}
                                            optionName='aim' 
                                            option={v} 
                                            optionShow={v.name}
                                            options={aims} 
                                            index={i} 
                                            setOptions={setAims} 
                                            selected={selectedAim} 
                                            setSelected={setSelectedAim} 
                                            setChild={setSelectedDriver}
                                            title={'Aim'}
                                            setUpdate={setUpdate}
                                            />
                                        ))
                                }
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