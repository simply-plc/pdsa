import {Card, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import Hover from '../general/Hover';
import Plan from './Plan';
import Do from './Do';
import Study from './Study';
import Act from './Act';
import Complete from './Complete';

export default function PDSA({cycle, changeIdea, setChangeIdea}) {
    const [view, setView] = useState(cycle?.stage); // Replace with the stage the cycle is in

    useEffect(() => {
        setView(cycle?.stage)
    }, [cycle?.stage])

    function handleSelectView({target}) {
        if (cycle) {
            setView(target.textContent);
        }
    }

    return <PDSAComponent 
        view={view} 
        handleSelectView={handleSelectView}
        cycle={cycle}
        changeIdea={changeIdea}
        setChangeIdea={setChangeIdea}
        />;
}


export function PDSAComponent({view, handleSelectView, cycle, changeIdea, setChangeIdea}) {
    const stageColors = {
        Plan: '#117da6',
        Do: '#f38620',
        Study: '#1aac4d',
        Act: '#773295',
        Complete: '#212529',
    };

    const stageIndices = { // for the disabled button
        'Plan':0,
        'Do':1,
        'Study':2,
        'Act':3,
    }

    return (
        <>
            {/* Card */}
            <Card className='border-0 shadow-sm rounded-4 h-100'>
                <Card.Body className='d-flex flex-column' style={{height: '0'}}>
                    {/* Header */}
                    <div className="d-flex flex-wrap">
                        {/* Title */}
                        <div className='h2'>PDSA</div>
                        {/* Nav */}
                        <div className='d-flex justify-content-center mb-3 ms-auto'>  
                            {['Plan', 'Do', 'Study', 'Act'].map((stage, i) => (
                                <Hover 
                                    comp={Button}
                                    className={`rounded-5 me-3 fw-bold`}
                                    disabled={i > stageIndices[cycle?.stage]} // if the button is greater than the current cycle then disable the button
                                    style={{
                                        color:view===stage ? '#ffffff' : stageColors[stage],
                                        width:'5rem', 
                                        borderColor:stageColors[stage], 
                                        borderWidth:'.15rem',
                                        transition:'borderColor .1 ease',
                                        backgroundColor:view===stage ? stageColors[stage] : '#FFFFFF',
                                    }}
                                    cStyle={{borderColor:'#0dcaf0'}}
                                    onClick={handleSelectView}
                                    >
                                    {stage}
                                </Hover>
                            ))}
                        </div>
                    </div>
                    {/* Body */}
                    <Card className='border-0 mt-2 rounded-4 flex-grow-1' style={{backgroundColor:stageColors[view]||'#f8f9fa', minHeight:'0'}}>
                        <Card.Body className='h-100 ps-4 pe-4 pb-2' >
                            <div className='w-100 h-100' style={{position:'relative'}}>
                                {/* None Selected */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column text-center text-muted'
                                    style={{position:'absolute', opacity:!view ? 1 : 0, zIndex:!view ? 1 : 0}}>
                                    <div>Select a cycle</div>
                                </div>
                                {/* Plan */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column'
                                    style={{position:'absolute', opacity:view==='Plan' ? 1 : 0, zIndex: view==='Plan' ? 1 : 0}}>
                                    <Plan cycle={cycle} changeIdea={changeIdea} setChangeIdea={setChangeIdea} show={view==='Plan'} stageColor={stageColors[view]} />
                                </div>
                                {/* Do */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column'
                                    style={{position:'absolute', opacity:view==='Do' ? 1 : 0, zIndex: view==='Do' ? 1 : 0}}>
                                    <Do cycle={cycle} changeIdea={changeIdea} setChangeIdea={setChangeIdea} show={view==='Do'} stageColor={stageColors[view]} />
                                </div>
                                {/* Study */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column'
                                    style={{position:'absolute', opacity:view==='Study' ? 1 : 0, zIndex: view==='Study' ? 1 : 0}}>
                                    <Study cycle={cycle} changeIdea={changeIdea} setChangeIdea={setChangeIdea} show={view==='Study'} stageColor={stageColors[view]} />
                                </div>
                                {/* Act */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column'
                                    style={{position:'absolute', opacity:view==='Act' ? 1 : 0, zIndex: view==='Act' ? 1 : 0}}>
                                    <Act cycle={cycle} changeIdea={changeIdea} setChangeIdea={setChangeIdea} show={view==='Act'} stageColor={stageColors[view]} />
                                </div>
                                {/* Complete */}
                                <div 
                                    className='w-100 h-100 overflow-hidden d-flex flex-column'
                                    style={{position:'absolute', opacity:view==='Complete' ? 1 : 0, zIndex: view==='Complete' ? 1 : 0}}>
                                    <Complete cycle={cycle} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    );
}