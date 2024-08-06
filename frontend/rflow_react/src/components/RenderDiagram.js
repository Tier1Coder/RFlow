import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartEventIcon from '../assets/icons/diagrams/StartEventIcon';
import EndEventIcon from '../assets/icons/diagrams/EndEventIcon';
import SequenceFlowIcon from '../assets/icons/diagrams/SequenceFlowIcon';
import ScriptTaskIcon from '../assets/icons/diagrams/ScriptTaskIcon';
import UserTaskIcon from '../assets/icons/diagrams/UserTaskIcon';
import ParallelGatewayIcon from '../assets/icons/diagrams/ParallelGatewayIcon';
import ParticipantIcon from '../assets/icons/diagrams/ParticipantIcon';

const RenderDiagram = () => {
    const location = useLocation();
    const diagramData = location.state?.diagramData?.xml_content;
    const diagramName = location.state?.diagramName;

    useEffect(() => {
        console.log(diagramData); // Debug
    }, [diagramData]);

    return (
        <div>
            <h2>Visualization of: {diagramName}</h2>

                <g id="workspace">
                    <ParticipantIcon width={500} height={500} x={0} y={0}></ParticipantIcon>
                </g>
            <div>
                <pre>{JSON.stringify(diagramData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default RenderDiagram;
