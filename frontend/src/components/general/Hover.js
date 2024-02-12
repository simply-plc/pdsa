import {useState} from 'react';


export default function Hover({c, change, style={}, children, ...props}) {
    const [hover, setHover] = useState(false); // This is for determining if mouse is hovering
    const hoverStyle = {
        ...style,
        ...change,
    };

    // Mouse is hovering
    function handleMouseOver({currentTarget}) {
        // alert(JSON.stringify(hoverStyle))
        setHover(true);
    }

    // Mouse is no longer hovering
    function handleMouseLeave({currentTarget}) {
        setHover(false);
    }

    return <c 
        style={hover ? hoverStyle : style} 
        onMouseOver={handleMouseOver} 
        onMouseLeave={handleMouseLeave}
        {...props}>
            {children}
        </c>
}