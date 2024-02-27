import {Card, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import Hover from '../general/Hover';
import ModalForm from '../general/ModalForm';
import SelectCard from './SelectCard';



export default function TeamChangeIdeas({team, selectedAim, selectedDriver, setSelectedDriver, selectedChangeIdea, setSelectedChangeIdea}) {
    /*
        TeamChangeIdeas is just the Change Ideas card on the UserTeam page
    */
    const navigate = useNavigate();
    const [update, setUpdate] = useState(true);
    const [changeIdeas, setChangeIdeas] = useState([]); // Sets the drivers
    const [show, setShow] = useState(); // show or close modal
    const pages = [
        [// Page 1
            {
                label: 'Give your change idea a name.',
                name: 'name',
                comp: Form.Control,
            },
            {
                label: 'What driver is the change idea for?',
                name: 'driver',
                comp: Form.Select,
                children: (
                    <>
                        <option value={selectedDriver?.id}>{selectedDriver?.name}</option>
                        {selectedAim?.drivers.map((v, i) => (v.id !== selectedDriver?.id) ? <option value={v.id}>{v.name}</option> : '')}
                    </>
                ),
            },
            {
                label: 'What is the action idea you want to implement?',
                name: 'idea',
                as: 'textarea',
                rows: 4,
                style: {resize: 'none'},
                comp: Form.Control,
            },
            {
                label: 'Are we testing, implementing, or spreading?',
                name: 'stage',
                comp: Form.Select,
                children: (
                    <>
                        <option value=''></option>
                        <option value='Testing'>Testing</option>
                        <option value='Implementing'>Implementing</option>
                        <option value='Spreading'>Spreading</option>
                    </>
                ),
            },
        ],
    ];

    const initialFormData = { // This is to control the form input
        name: '',
        driver: selectedDriver?.id,
        idea: '',
        stage: '',
    };

    // set the drivers for the team
    useEffect(() => {
        const newChangeIdeas = selectedDriver?.change_ideas;
        newChangeIdeas?.sort((a, b) => new Date(b.modified_date) - new Date(a.modified_date)); // Sort it based on modified date
        setChangeIdeas(newChangeIdeas) // Set the new drivers
    }, [selectedDriver, update]);

    // This is to maintain the state of the current page before navigating to change ideas.
    // This is will maintain state if change ideas is redirected back to this page
    function handleClick(changeIdea) {
        const optionState = { // Maintains the state of what is selected
            team: team,
            aim: selectedAim,
            driver: selectedDriver,
        };
        navigate(`../change-ideas/${changeIdea.id}`, {state: optionState}); // Navigate to change-idea page
    }

    // This handles opening create modal
    function handleOpenModal(event) {
        setShow(true);
    }

    function handleSave(formData) {
        // Post the new aim
        axios.post('http://127.0.0.1:8000/api/change-idea/create/', {...formData})
            .then(response => {
                // Adds the driver ( This is necessary because the selected aim might not be the aim you are adding a driver for)
                let driver = selectedAim.drivers.filter((driver) => driver.id === response.data.driver)[0]; // Set the selected aim to have the driver
                driver.change_ideas.unshift(response.data); // update driver's change ideas
                setSelectedDriver(driver); // select the driver
                setUpdate(u => !u); // update
            })
            .catch(error => alert(error.message));
    }

    return <TeamChangeIdeasComponent
        show={show}
        setShow={setShow}
        pages={pages}
        handleOpenModal={handleOpenModal}
        handleSave={handleSave}
        initialFormData={initialFormData}
        setChangeIdeas={setChangeIdeas}
        changeIdeas={changeIdeas}
        selectedChangeIdea={selectedChangeIdea}
        setSelectedChangeIdea={setSelectedChangeIdea}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        handleClick={handleClick}
        selectedAim={selectedAim}
        setUpdate={setUpdate}
        />
}


export function TeamChangeIdeasComponent({
    handleSave, handleOpenModal,
    show, setShow, initialFormData, pages, setChangeIdeas, changeIdeas,
    selectedChangeIdea, setSelectedChangeIdea, selectedDriver, handleClick,
    setSelectedDriver, selectedAim, setUpdate,
    }) {



    return (
        <>
            {/* Card */}
            <Card className='border-0 shadow-sm rounded-4'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Header */}
                    <div className="d-flex">
                        {/* Title */}
                        <div className='h2'>Change Ideas</div>
                        {/* Add button */}
                        <Hover 
                            comp={(props)=><span {...props}></span>}
                            style={{width:'3rem', transition: 'width .2s ease'}}
                            cStyle={{width:'12rem'}}
                            className='ms-auto mb-auto mt-auto btn btn-outline-primary border-2 rounded-5 d-flex'
                            onClick={(handleOpenModal)}
                            >
                            {/* Hidden text; show on hover */}
                            <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Add Change Ideas</span>
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
                                    (!changeIdeas) ? <div className='text-muted text-center'>Select a driver first</div> :
                                    (changeIdeas?.length === 0) ? <div className='text-muted text-center'>Add a change idea</div> :
                                    changeIdeas?.map((v, i) => (
                                        <SelectCard 
                                            optionName='change-idea' 
                                            option={v} 
                                            optionShow={v.name}
                                            options={changeIdeas} 
                                            index={i} 
                                            setOptions={setChangeIdeas} 
                                            selected={selectedChangeIdea} 
                                            setSelected={setSelectedChangeIdea} 
                                            pages={pages}
                                            parent={selectedDriver}
                                            setParent={setSelectedDriver}
                                            gparent={selectedAim}
                                            parentKey={'drivers'}
                                            singleParentKey={'driver'}
                                            optionKey={'change_ideas'}
                                            onClick={handleClick}
                                            title={'Change Idea'}
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
            <ModalForm title={'Add Change Idea'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={initialFormData} />
        </>
    );
}