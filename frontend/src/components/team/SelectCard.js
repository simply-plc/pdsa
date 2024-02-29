import {Card, Dropdown} from 'react-bootstrap';
import {useRef, useState} from 'react';

import http from '../../http';
import Hover from '../general/Hover';
import CustomToolTip from '../general/CustomToolTip';
import ModalForm from '../general/ModalForm';

export default function SelectCard({
    parent, setParent, optionKey, setChild, pages, optionName, option, optionShow, options, 
    index, setOptions, selected, setSelected, 
    tooltipPlacement='auto-end',
    onClick=()=>{},
    title, gparent, parentKey, setUpdate, singleParentKey,
    }) {
    /* 
        This is just a generalization of the selectable aim, driver, or change ideas
    */

    const styleRef = useRef(); // Ref for the hover component
    const [show, setShow] = useState(false); // show stuff /

    // open modal /
    function handleOpenModal() {
        setShow(true);
    }

    // handle update /
    function handleSave(formData) {
        http.put(`http://127.0.0.1:8000/api/${optionName}/${option.id}/`, {...formData})
            .then(response => {
                // Updates the change idea on the front end
                if (parent) {
                    // move option out of parent
                    let index = parent[optionKey].findIndex((ci) => ci.id === option.id); // set the index of the option in the parent
                    let updateOption = parent[optionKey].splice(index, 1)[0]; // remove option from the parent                  
                    // move option into new parent
                    let newParent = gparent[parentKey].filter((c) => c.id === response.data[singleParentKey])[0]; // Get new driver
                    newParent[optionKey].unshift(updateOption);
                    // update option
                    for (let key in formData) {
                        updateOption[key] = response.data[key];
                    }

                    setParent(newParent); // set parent as selected
                } else {
                    for (let key in formData) {
                        option[key] = response.data[key];
                    } // This doesn't update what the driver is pointing to?

                }
                // update
                setSelected(option); // set this as selected
                setUpdate(u => !u); // update
            })
            .catch(error => alert(error.message));
    }

    function handleDelete() {
        http.delete(`http://127.0.0.1:8000/api/${optionName}/${option.id}/`)
            .then(response => {
                if (selected?.id === option.id) {// If the deleted is the selected, then no more selected
                    setSelected(null);
                }
                options.splice(index, 1); // Removes it from the options list so that backend and frontend match
                // const newOptions = [...options];
                if (parent) { // This is to keep the parent item up to date with the deletion so it matches the backend
                    parent[optionKey] = options;
                }
                setOptions(options);
                setUpdate(u=>!u);
            })
            .catch(error => alert(error.message));
    }

    // Handles whether the item is selected or not
    function handleSelected() {
        onClick(option);
        if (selected?.id === option.id) { // If the item clicked is the same as the current selected, then remove selected item
            setChild && setChild(null);
            setSelected(null);
        } else {
            setChild && setChild(null);
            setSelected(option);
        }
    }

    // This is to resolve the hover component when mouse goes over tooltip
    function handleToggle(show) {
        if (!show) {
            styleRef.current.style.borderColor = selected?.id === option.id ? '#0dcaf0' : '#ffffff';
        } else {
            styleRef.current.style.borderColor = '#20c997';
        }
    }

    // This is the tooltip header
    const tooltipHeader = (
        <div className='text-white fw-bold text-center'>
            {option.name}
        </div>
    );

    // This is the tooltip body
    const tooltipBody = (
        <div>
            {pages?.flat().map((v, i) => (
                v.name !== 'name' &&
                <>
                    <div className='fw-bold'>{v.label}</div>
                    <div className='ps-2 mb-2 text-muted'>{(!['driver', 'aim'].includes(v.name)) ? option[v.name] : parent?.name}</div>
                </>
            ))}
        </div>
    );

    return <SelectCardComponent 
        styleRef={styleRef}
        option={option} 
        optionShow={optionShow} 
        handleDelete={handleDelete} 
        handleSelected={handleSelected} 
        selected={selected} 
        tooltipHeader={tooltipHeader}
        tooltipBody={tooltipBody} 
        placement={tooltipPlacement}
        handleToggle={handleToggle}
        optionName={optionName}
        title={title}
        show={show}
        setShow={setShow}
        handleOpenModal={handleOpenModal}
        pages={pages}
        handleSave={handleSave}
        />;
}

export function SelectCardComponent({styleRef, option, optionShow, selected, 
    handleDelete, handleSelected, tooltipHeader, tooltipBody, placement, 
    handleToggle, optionName,
    title, show, setShow, handleOpenModal, pages, handleSave,
    }) {
    const stageColor ={
        Testing: 'danger',
        Implementing: 'warning',
        Spreading: 'success',
    };

    return (
        <>
            <Hover
                ref={styleRef}
                comp={Card}
                className={'shadow-sm rounded-4 mb-2 ' + ((selected?.id === option.id) ? 'text-white fw-bold' : 'text-primary')}
                bg={selected?.id === option.id ? 'info' : 'white'}
                style={{height:"3.5rem", borderColor:selected?.id === option.id ? '#0dcaf0' : '#ffffff', transition: 'border-color .15s ease'}}
                cStyle={{borderColor:'#20c997'}}
                onClick={handleSelected}
                >
                {/* This is the tooltip */}
                <CustomToolTip placement={placement} header={tooltipHeader} body={tooltipBody} onToggle={handleToggle}> 
                    {/* Card */}
                    <Card.Body className='d-flex p-0 ps-3 pe-3'>
                        {/* Title */}
                        <div 
                            className='overflow-hidden mt-auto mb-auto w-100 d-flex' 
                            style={{height:'1.5rem'}}
                            >
                            <span>{optionShow}</span>
                            {(optionName === 'change-idea') && 
                                <span className='ms-auto'>
                                    <div className={`badge text-white rounded-4 text-white bg-${stageColor[option.stage]}`}>
                                        {option.stage}
                                    </div>
                                </span>
                            }
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
                </CustomToolTip>
            </Hover>
            {/* Modal */}
            <ModalForm title={`Update ${title}`} show={show} setShow={setShow} onSave={handleSave} pages={pages} initialFormData={{...option}} update={true} />
        </>
    );  
}