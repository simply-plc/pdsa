import {Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import http from '../../http';
import Hover from '../general/Hover';
import ModalForm from '../general/ModalForm';
import CycleCard from './CycleCard';

export default function Cycles({changeIdea, selectedCycle, setSelectedCycle}) {
    const [cycles, setCycles] = useState(changeIdea?.pdsas); // Current list of cycles
    const [show, setShow] = useState(false); // show modal
    const [update, setUpdate] = useState(false);
    const pages = [[{ // Pages for the modal
        label: 'Give your cycle a name.',
        name: 'name',
        comp: Form.Control,
    }]]

    const initialFormData = { // This is to control the form input
        name: '',
    };

    // Initialize the list of cycles
    useEffect(() => {
        changeIdea?.pdsas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        // const newCycles = changeIdea?.pdsas;
        // newCycles?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort it based on modified date
        setCycles(changeIdea?.pdsas);
    }, [changeIdea, update]);

    // Open modal
    function handleOpenModal() {
        setShow(true);
    }

    // Save the new cycle and set the selected value to new cycle
    function handleSave(formData) {
        // Post the new aim
        http.post('http://127.0.0.1:8000/api/pdsa/create/', {...formData, change_idea: changeIdea.id, created_by: changeIdea.created_by})
            .then(response => {
                // Adds the aim
                cycles.unshift(response.data);
                setSelectedCycle(response.data);
                setUpdate(u=>!u);
            })
            .catch(error => alert(error.message));
    }

    return <CyclesComponent 
        cycles={cycles} 
        setCycles={setCycles}
        handleOpenModal={handleOpenModal} 
        show={show}
        setShow={setShow}
        handleSave={handleSave}
        pages={pages}
        initialFormData={initialFormData}
        selectedCycle={selectedCycle}
        setSelectedCycle={setSelectedCycle}
        />;
}

export function CyclesComponent({
    cycles, setCycles, handleOpenModal, show, setShow, handleSave, pages, initialFormData, selectedCycle, setSelectedCycle,
    }) {
    return (
        <>
            <Card className='border-0 rounded-4 bg-white h-100 shadow-sm'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Header */}
                    <div className="d-flex">
                        {/* Title */}
                        <div className='h2'>Cycles</div>
                        {/* Add button */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'8.5rem'}}
                            className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                            onClick={handleOpenModal}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Cycle</span>
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
                                    (cycles?.length === 0) ? <div className='text-muted text-center'>Add a cycle</div> :
                                    cycles?.map((v, i) => (
                                    <CycleCard 
                                        cycle={v} 
                                        setCycles={setCycles} 
                                        cycles={cycles} 
                                        selectedCycle={selectedCycle} 
                                        setSelectedCycle={setSelectedCycle} 
                                        index={i}
                                        />
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Modal */} 
            <ModalForm title={'Add Cycle'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={initialFormData} />
        </>
    );
}