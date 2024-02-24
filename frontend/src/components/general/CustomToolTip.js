import {OverlayTrigger, Popover} from 'react-bootstrap';
import {useState} from 'react';




export default function CustomToolTip({placement='auto', header, body, children, onToggle=()=>{}}) {
    const [show, setShow] = useState(false); // Controls the show

    const overlay = (
        <Popover className='shadow-sm border-0 rounded-4'>
            <Popover.Header className='bg-primary border-primary rounded-top-4'>{header}</Popover.Header>
            <Popover.Body>
                {body}
            </Popover.Body>
        </Popover>
    );

    // Triggers when trigger is triggered
    function handleToggle(newShow) {
        onToggle(newShow);
        setShow(newShow);
    }

    return (
        <OverlayTrigger 
            placement={placement} 
            overlay={overlay}
            delay={{ show: 50, hide: 100 }}
            show={show}
            onToggle={handleToggle}
            >
            {children}
        </OverlayTrigger>
    );
}