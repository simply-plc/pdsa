import {useState} from 'react';


export default function Hover({comp:Comp, cStyle={}, style={}, cClassName='', className='', children, ...props}) {
    // const Comp = comp;
    const [hover, setHover] = useState(false); // This is for determining if mouse is hovering
    const hoverStyle = {
        ...style,
        ...cStyle,
    };

    const hoverClassName = className + " " + cClassName;

    // Mouse is hovering
    function handleMouseOver({currentTarget}) {
        // alert(JSON.stringify(hoverStyle))
        // alert(hoverClassName);
        setHover(true);
    }

    // Mouse is no longer hovering
    function handleMouseLeave({currentTarget}) {
        setHover(false);
    }

    return <Comp
        style={hover ? hoverStyle : style} 
        className={hover ? hoverClassName : className}
        onMouseOver={handleMouseOver} 
        onMouseLeave={handleMouseLeave}
        {...props}>
            {children}
        </Comp>
}