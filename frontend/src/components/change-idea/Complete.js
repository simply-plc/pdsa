import {Card} from 'react-bootstrap';




export default function Complete({cycle}) {

    return <CompleteComponent cycle={cycle} />;
}

export function CompleteComponent({cycle}) {
    const stageColors = {
        Plan: '#117da6',
        Do: '#f38620',
        Study: '#1aac4d',
        Act: '#773295',
        Complete: '#212529',
    };

    return (
        <div className='overflow-auto'>
            {/* Plan */}
            <Card className="border-0 rounded-4 mb-3" style={{backgroundColor:stageColors['Plan']}}>
                <Card.Body>
                    <div className='h3 text-white text-center'>Plan</div>
                    {/* learning goal */}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Plan']}}>
                                What do you want to learn?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.learning_goal}</div>
                        </Card.Body>
                    </Card>
                    {/* steps */}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Plan']}}>
                                What steps do you need to test?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.steps}</div>
                        </Card.Body>
                    </Card>
                    {/* measure */}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Plan']}}>
                                What data are you going to measure?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.measure}</div>
                        </Card.Body>
                    </Card>
                    {/* predictions */}
                    <Card className="border-0 rounded-4">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Plan']}}>
                                What predictions do you have about the data?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.predictions}</div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Do */}
            <Card className="border-0 rounded-4 mb-3" style={{backgroundColor:stageColors['Do']}}>
                <Card.Body>
                    <div className='h3 text-white text-center'>Do</div>
                    {/* by date*/}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Do']}}>
                                When are you going to test the change idea?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.by_date}</div>
                        </Card.Body>
                    </Card>
                    {/* notes */}
                    <Card className="border-0 rounded-4">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Do']}}>
                                Notes:
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.do_notes}</div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Study */}
            <Card className="border-0 rounded-4 mb-3" style={{backgroundColor:stageColors['Study']}}>
                <Card.Body>
                    <div className='h3 text-white text-center'>Study</div>
                    {/* data */}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Study']}}>
                                What is the data you collected?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.data}</div>
                        </Card.Body>
                    </Card>
                    {/* learning */}
                    <Card className="border-0 rounded-4">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Study']}}>
                                What did you learn from the data you collected?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.learning}</div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            {/* Act */}
            <Card className="border-0 rounded-4 mb-3" style={{backgroundColor:stageColors['Act']}}>
                <Card.Body>
                    <div className='h3 text-white text-center'>Act</div>
                    {/* next steps */}
                    <Card className="border-0 rounded-4 mb-3">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Act']}}>
                                Are you going to implement, expand, or abandon the change idea?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.next_step}</div>
                        </Card.Body>
                    </Card>
                    {/* next steps rationale */}
                    <Card className="border-0 rounded-4">
                        <Card.Body>
                            <div className='fw-bold' style={{color:stageColors['Act']}}>
                                What is your rationale for the choice?
                            </div>
                            <div className='ms-3 text-muted'>{cycle?.next_step_rationale}</div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}