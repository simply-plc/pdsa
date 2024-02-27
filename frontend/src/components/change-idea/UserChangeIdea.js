import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Button, Row, Col, Form} from 'react-bootstrap';

import Hover from '../general/Hover';
import InfoCycles from './InfoCycles';
import PDSA from './PDSA';
import ModalForm from '../general/ModalForm';

export default function UserChangeIdea() {
    /*
        User team is the team page that shows the aims, drivers, and change idea lists
    */
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams(); // Get params
    const [changeIdea, setChangeIdea] = useState(); // Current change idea info
    const [selectedCycle, setSelectedCycle] = useState(); // Currently selected Cycle
    // Everything here is for the modal ////////////////////////
    const [update, setUpdate] = useState(false); // update the whole page
    const [show, setShow] = useState(false); // show modal?
    const pages = [ // Pages of modal
        [// Page 1
            {
                label: 'Update change idea name.',
                name: 'name',
                comp: Form.Control,
            },
            {
                label: 'What driver is the change idea for?',
                name: 'driver',
                comp: Form.Select,
                children: (
                    <>
                        <option value={location.state.driver?.id}>{location.state.driver?.name}</option>
                        {location.state.aim?.drivers.map((v, i) => (v.id !== location.state.driver?.id) ? <option value={v.id}>{v.name}</option> : '')}
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

    // Initialize the change idea info
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/change-idea/${params.changeIdeaId}/`, {
                    headers: {'Content-Type': 'application/json'},
                }
            )
            .then(response => {
                setChangeIdea(response.data);
            })
            .catch(error => {
                // alert(error.message + ' UserTeam');
            });
    } ,[params.changeIdeaId, update]);

    // Back button NOTE: this is back to the teams page. When navigating 
    function handleBackButton() {
        if (location.state?.team) {
            const {team, ...optionState} = location.state;
            navigate(`../teams/${team.id}`, {state: optionState});
        } else {
            navigate(-1);
        }
    }

    // update change idea /////////////// For modal
    function handleSave(formData) {
        axios.put(`http://127.0.0.1:8000/api/change-idea/${changeIdea.id}/`, {...formData})
            .then(response => {
                // Updates the change idea on the front end
                // old driver
                let index;
                location.state.driver.change_ideas.filter((ci, i) => {index = i}); // set the index of the change idea in the old driver /// this might have error cuz index is being set without condition
                location.state.driver.change_ideas.splice(index, 1); // remove change idea from old driver
                // new driver
                let driver = location.state.aim.drivers.filter((driver) => driver.id === response.data.driver)[0]; // Get new driver
                driver.change_ideas.unshift(response.data); // add change idea to new driver
                location.state.driver = driver; // set new driver as current driver
                // update
                setUpdate(u => !u); // update
            })
            .catch(error => alert(error.message));
    }

    // This handles opening create modal /////////////////// for modal
    function handleOpenModal(event) {
        setShow(true);
    }

    return <UserChangeIdeaComponent 
        changeIdea={changeIdea} 
        location={location}
        handleBackButton={handleBackButton}
        selectedCycle={selectedCycle}
        setSelectedCycle={setSelectedCycle}
        setChangeIdea={setChangeIdea}
        show={show}
        setShow={setShow}
        pages={pages}
        handleSave={handleSave}
        handleOpenModal={handleOpenModal}
        />;
}

export function UserChangeIdeaComponent({
    changeIdea, location,
    handleBackButton, selectedCycle, setSelectedCycle, setChangeIdea,
    show, setShow, pages, handleSave, handleOpenModal,
    }) {
    return (
        <>
            <div className='vh-100 d-flex flex-column' style={{minHeight:'45rem'}}>
                {/* Top header nav */}
                <div>
                    {/* Header */}
                    <Card body bg='light' className='border-0'>
                        <div className='d-flex'>
                            {/* Back button */}
                            <Button className='me-5 mb-auto mt-auto' variant='light' onClick={handleBackButton}>
                                <span className='bi-chevron-left text-dark text-center' style={{fontSize: '1.5rem'}} />
                            </Button>
                            {/* Title */}
                            <div className='h1 fw-bold d-inline-block mb-auto mt-auto'>{changeIdea?.name}</div>
                            {/* Settings */}
                            <Hover 
                                comp={(props)=><span {...props}></span>}
                                style={{width:'3rem', transition: 'width .2s ease'}}
                                cStyle={{width:'14rem'}}
                                className='ms-auto mb-auto mt-auto btn border-dark border-2 bg-white rounded-5 d-flex'
                                onClick={(handleOpenModal)}
                                >
                                {/* Hidden text; show on hover */}
                                <span className='text-nowrap overflow-x-hidden mb-auto mt-auto fw-bold'>Change Idea Settings</span>
                                {/* Plus sign */}
                                <span className='bi-gear-fill fs-5 ms-auto' />
                            </Hover>
                        </div>
                    </Card>
                </div>
                {/* the rest */}
                <Row className='flex-grow-1 m-0'>
                    {/* First Col */}
                    <Col className='mb-3' lg={6}>
                        {/* Info and Cycles */}
                        <InfoCycles 
                            changeIdea={changeIdea} 
                            aim={location.state.aim} 
                            driver={location.state.driver} 
                            selectedCycle={selectedCycle} 
                            setSelectedCycle={setSelectedCycle}
                            />
                    </Col>
                    {/* Second Col */}
                    <Col className='flex-grow-1 mb-3' lg={6}>
                        {/* Cylce form */}
                            <PDSA cycle={selectedCycle} changeIdea={changeIdea} setChangeIdea={setChangeIdea} />
                    </Col>
                </Row>
            </div>
            {/* Modal */}
            <ModalForm title={'Update Change Idea'} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={{...changeIdea}} update={true} />
        </>
    );
}















