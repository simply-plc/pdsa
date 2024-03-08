import {Button} from 'react-bootstrap';
import {useState} from 'react';

import Hover from '../general/Hover';
import Info from './Info';
import Cycles from './Cycles';


export default function InfoCycles({changeIdea, 
    // aim, 
    driver, selectedCycle, setSelectedCycle}) {
    const [view, setView] = useState('Cycles');

    // select which card to view: info or cycles
    function handleSelectView({target}) {
        setView(target.textContent);
    }

    return <InfoCyclesComponent 
        handleSelectView={handleSelectView}
        view={view}
        changeIdea={changeIdea}
        // aim={aim}
        driver={driver}
        selectedCycle={selectedCycle}
        setSelectedCycle={setSelectedCycle}
        />;
}


export function InfoCyclesComponent({
    handleSelectView, view, changeIdea, aim, driver, selectedCycle, setSelectedCycle,
    }) {
    return (
        <>
            {/* Card */}
            <div className='d-flex flex-column h-100 w-100'>
                {/* Nav */}
                <div className='d-flex justify-content-center mb-3'>  
                    {/* Info button */}
                    <Hover 
                        comp={Button}
                        className={`bg-${view === 'Info' ? 'primary' : 'white'} rounded-5 shadow-sm me-3 fw-bold text-${view === 'Info' ? 'white' : 'dark'}`}
                        style={{width:'5rem', borderColor:view === 'Info' ? "#20c997" : "#ffffff", transition:'borderColor .1 ease'}}
                        cStyle={{borderColor:'#0dcaf0'}}
                        onClick={handleSelectView}
                        >
                        Info
                    </Hover>
                    {/* Cycles button */}
                    <Hover 
                        comp={Button}
                        className={`bg-${view === 'Cycles' ? 'primary' : 'white'} rounded-5 shadow-sm me-3 fw-bold text-${view === 'Cycles' ? 'white' : 'dark'}`}
                        style={{width:'5rem', borderColor:view === 'Cycles' ? "#20c997" : "#ffffff", transition:'borderColor .1 ease'}}
                        cStyle={{borderColor:'#0dcaf0'}}
                        onClick={handleSelectView}
                        >
                        Cycles
                    </Hover>
                </div>
                {/* Body */}
                <div className='flex-grow-1 w-100' style={{position:'relative'}}>
                    {/* Info */}
                    <div 
                        className='w-100 h-100'
                        style={{position:'absolute', transition:'opacity .2s ease', opacity:view==='Info' ? 1 : 0, zIndex: view==='Info' ? 1 : 0}}>
                        <Info 
                            // aim={aim} 
                            driver={driver} changeIdea={changeIdea} />
                    </div>
                    {/* Cycles */}
                    <div 
                        className='w-100 h-100'
                        style={{position:'absolute', transition:'opacity .2s ease', opacity:view==='Cycles' ? 1 : 0, zIndex: view==='Cycles' ? 1 : 0}}>
                        <Cycles changeIdea={changeIdea} selectedCycle={selectedCycle} setSelectedCycle={setSelectedCycle} />
                    </div>
                </div>
            </div>
        </>
    );
}