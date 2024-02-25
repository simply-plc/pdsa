import {Card, Button} from 'react-bootstrap';
import {useState} from 'react';

import Hover from '../general/Hover';
import Info from './Info';
import Cycles from './Cycles';


export default function InfoCycles({changeIdea, aim, driver}) {
    const [view, setView] = useState('Cycles');

    function handleSelectView({target}) {
        setView(target.textContent);
    }

    return <InfoCyclesComponent 
        handleSelectView={handleSelectView}
        view={view}
        changeIdea={changeIdea}
        aim={aim}
        driver={driver}
        />;
}


export function InfoCyclesComponent({
    handleSelectView, view, changeIdea, aim, driver,
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
                        <Info aim={aim} driver={driver} />
                    </div>
                    {/* Cycles */}
                    <div 
                        className='w-100 h-100'
                        style={{position:'absolute', transition:'opacity .2s ease', opacity:view==='Cycles' ? 1 : 0, zIndex: view==='Cycles' ? 1 : 0}}>
                        <Cycles />
                    </div>
                </div>
            </div>
        </>
    );
}