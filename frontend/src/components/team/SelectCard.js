import {Card, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import {useRef} from 'react';

import Hover from '../general/Hover';
import CustomToolTip from '../general/CustomToolTip';

export default function SelectCard({
    parent, pages, optionName, option, optionShow, options, 
    index, setOptions, selected, setSelected, 
    tooltipPlacement='auto-end'
    }) {
    /* 
        This is just a generalization of the selectable aim, driver, or change ideas
    */

    const styleRef = useRef(); // Ref for the hover component

    function handleDelete() {
        axios.delete(`http://127.0.0.1:8000/api/${optionName}/${option.id}/`)
            .then(response => {
                if (selected?.id === option.id) {// If the deleted is the selected, then no more selected
                    setSelected(null);
                }
                options.splice(index, 1); // Removes it from the options list so that backend and frontend match
                setOptions([...options]);
            })
            .catch(error => alert(error.message));
    }

    // Handles whether the item is selected or not
    function handleSelected() {
        if (selected?.id === option.id) { // If the item clicked is the same as the current selected, then remove selected item
            setSelected(null);
        } else {
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
        />;
}

export function SelectCardComponent({styleRef, option, optionShow, selected, handleDelete, handleSelected, tooltipHeader, tooltipBody, placement, handleToggle}) {
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
                            className='overflow-hidden mt-auto mb-auto w-100' 
                            style={{height:'1.5rem'}}
                            >
                            {optionShow}
                        </div>
                        {/* Menu */}
                        <div className='ms-auto mt-auto mb-auto text-center d-inline-block' style={{width:'3rem'}}>
                            {/* Menu dropdown */}
                            <Dropdown onClick={(e)=>e.stopPropagation()}>
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
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    {/* Delete */}
                                    <Dropdown.Item className='text-danger' onClick={handleDelete}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Body>
                </CustomToolTip>
            </Hover>
        </>
    );  
}