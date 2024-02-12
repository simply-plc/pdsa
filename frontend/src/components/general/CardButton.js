import {Card, Button} from 'react-bootstrap';
import {useState} from 'react';




///////////////
// Container //
///////////////

export default function CardButton({children, ...props}) {
    const [hover, setHover] = useState(false);

    function handleMouseOver({currentTarget}) {
        setHover(true);
    }

    function handleMouseLeave({currentTarget}) {
        setHover(false);
    }

    return <CardButtonComponent 
        handleMouseLeave={handleMouseLeave}
        handleMouseOver={handleMouseOver}
        hover={hover}
        children={children}
        {...props}
        />
}


///////////////
// Component //
///////////////

export function CardButtonComponent({
    handleMouseLeave, handleMouseOver,
    hover, children, ...props
    }) {


    return (
        <Card 
            body 
            className={`w-100 border-1 ${hover ? 'border-dark' : 'border-white'} ${hover ? 'shadow-lg' : 'shadow-sm'}`} 
            style={{cursor: hover ? 'pointer' : ''}}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            {...props}
            >
            {children}
        </Card>
    );
}





