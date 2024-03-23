import {useParams} from 'react-router-dom';


// //////////////////// you might delete this file because you probably want to have an index for the :id that contains
// the different navs for the team

export default function Insights() {

    ///////////////
    // Container //
    ///////////////

    const {id} = useParams();

    ///////////////
    // Component //
    ///////////////

    return (
        <div>{id}</div>
    );
}