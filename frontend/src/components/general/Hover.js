import {useState, useEffect} from 'react';


export default function Hover({comp:Comp, cStyle={}, style={}, cClassName='', className='', onClick, children, ...props}) {
    // const Comp = comp;
    const [hover, setHover] = useState(false); // This is for determining if mouse is hovering
    const hoverStyle = { // sets new Styles
        ...style,
        ...cStyle,
    };

    const hoverClassName = className + " " + cClassName; // sets new className

    // Whenever onClick event is fired, it resets the hover for a rerender
    useEffect(() => {
        setHover(false);
    }, [onClick])

    // Mouse is hovering
    function handleMouseOver() {
        // alert(JSON.stringify(hoverStyle))
        // alert(hoverClassName);
        setHover(true);
    }

    // Mouse is no longer hovering
    function handleMouseLeave() {
        setHover(false);
    }

    return <Comp
        style={hover ? hoverStyle : style} 
        className={hover ? hoverClassName : className}
        onMouseOver={handleMouseOver} 
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...props}>
            {children}
        </Comp>
}