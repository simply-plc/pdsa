import {Card, Dropdown, Badge, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Hover from '../general/Hover';
import ModalForm from '../general/ModalForm';

export default function CycleCard({cycle, setCycles, cycles, selectedCycle, setSelectedCycle, index}) {
    const cycleNum = cycles.length - index;
    const [show, setShow] = useState(false); // show modal
    const [update, setUpdate] = useState(false); // update whole thing
    const pages = [ // Pages of modal
        [// Page 1
            {
                label: 'Update cycle name.',
                name: 'name',
                comp: Form.Control,
            },
        ],
    ];

    // useEffect(() => setUpdate(u => !u), [update]) // update whole component

    // Handles deleting a cycle
    function handleDelete() {
        axios.delete(`http://127.0.0.1:8000/api/pdsa/${cycle.id}/`)
            .then(response => {
                if (selectedCycle?.id === cycle.id) {// If the deleted is the selected, then no more selected
                    setSelectedCycle(null);
                }
                cycles.splice(index, 1); // Removes it from the options list so that backend and frontend match
                setUpdate(u=>!u);
            })
            .catch(error => alert(error.message));
    }

    // Handles selecting a cycle
    function handleSelected() {
        if (selectedCycle?.id === cycle.id) { // If the item clicked is the same as the current selected, then remove selected item
            setSelectedCycle(null);
        } else {
            setSelectedCycle(cycle);
        }
    }

    // open modal
    function handleOpenModal() {
        setShow(true);
    }

    // handle update
    function handleSave(formData) {
        // update the cycle
        axios.put(`http://127.0.0.1:8000/api/pdsa/${cycle.id}/`, {...formData})
            .then(response => {
                for (let key in formData) {
                    cycle[key] = response.data[key];
                }

                setUpdate(u => !u);
            })
            .catch(error => alert(error.message));
    }

    return <CycleCardComponent 
        cycle={cycle} 
        selectedCycle={selectedCycle} 
        handleSelected={handleSelected} 
        handleDelete={handleDelete} 
        cycleNum={cycleNum}
        show={show}
        setShow={setShow}
        pages={pages}
        handleSave={handleSave}
        handleOpenModal={handleOpenModal}
        />
}

export function CycleCardComponent({cycle, selectedCycle, handleSelected, handleDelete, cycleNum, 
    show, setShow, pages, handleSave, handleOpenModal,
    }) {
    const stageColor = {
        Plan: '#117da6',
        Do: '#f38620',
        Study: '#1aac4d',
        Act: '#773295',
        Complete: '#212529',
    };

    return (
        <>
            <Hover
                comp={Card}
                className={'shadow-sm rounded-4 mb-2 ' + ((selectedCycle?.id === cycle.id) ? 'text-white fw-bold' : 'text-primary')}
                bg={selectedCycle?.id === cycle.id ? 'info' : 'white'}
                style={{height:"3.5rem", borderColor:selectedCycle?.id === cycle.id ? '#0dcaf0' : '#ffffff', transition: 'border-color .15s ease'}}
                cStyle={{borderColor:'#20c997'}}
                onClick={handleSelected}
                >
                {/* Card */}
                <Card.Body className='d-flex p-0 ps-3 pe-3'>
                    {/* Title */}
                    <div 
                        className='overflow-hidden mt-auto mb-auto w-100 d-flex' 
                        style={{height:'1.5rem'}}
                        >
                        <span>
                            <Badge bg='primary' className='text-white rounded-4 me-3'>
                                #{cycleNum} 
                            </Badge>
                            <span>{cycle.name}</span>
                        </span>
                        <span className='ms-auto'>
                            <div className='badge text-white rounded-4' style={{backgroundColor: stageColor[cycle.stage]}}>
                                {cycle.stage}
                            </div>
                        </span>
                    </div>
                    {/* Menu */}
                    <div className='ms-auto mt-auto mb-auto text-center d-inline-block' style={{width:'3rem'}}>
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
                                <Dropdown.Item onClick={handleOpenModal}>Edit</Dropdown.Item>
                                {/* Delete */}
                                <Dropdown.Item className='text-danger' onClick={handleDelete}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Body>
            </Hover>
            {/* Modal */}
            <ModalForm title={'Update Cycle'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={{...cycle}} update={true} />
        </>
    );
}