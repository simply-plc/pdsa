import {useParams} from 'react-router-dom';


// //////////////////// you might delete this file because you probably want to have an index for the :id that contains
// the different navs for the team

export default function Dashboard() {

    ///////////////
    // Container //
    ///////////////

    const {id} = useParams();

    ///////////////
    // Component //
    ///////////////

    return (
        <div>{id} this will look like the dashboard asana has with tasks and what not</div>
    );
}