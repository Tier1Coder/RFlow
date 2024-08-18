import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartEventIcon from '../assets/icons/diagrams/StartEventIcon.tsx';
import EndEventIcon from '../assets/icons/diagrams/EndEventIcon.tsx';
import SequenceFlowIcon from '../assets/icons/diagrams/SequenceFlowIcon.tsx';
import ScriptTaskIcon from '../assets/icons/diagrams/ScriptTaskIcon.tsx';
import UserTaskIcon from '../assets/icons/diagrams/UserTaskIcon.tsx';
import ParallelGatewayIcon from '../assets/icons/diagrams/ParallelGatewayIcon.tsx';
import ParticipantIcon from '../assets/icons/diagrams/ParticipantIcon.tsx';
import ServiceTaskIcon from '../assets/icons/diagrams/ServiceTaskIcon.tsx';
import ExclusiveGatewayIcon from '../assets/icons/diagrams/ExclusiveGatewayIcon.tsx';
import MessageFlowIcon from '../assets/icons/diagrams/MessageFlowIcon.tsx';
import DataInputIcon from '../assets/icons/diagrams/DataInputIcon.tsx';
import SendTaskIcon from '../assets/icons/diagrams/SendTaskIcon.tsx';
import DataOutputIcon from '../assets/icons/diagrams/DataOutputIcon.tsx';
import TaskIcon from '../assets/icons/diagrams/TaskIcon.tsx';
import '../styles/DiagramRenderer.css';
import TextAnnotationIcon from '../assets/icons/diagrams/TextAnnotationIcon.tsx';
import DataInputAssociationFlowIcon from '../assets/icons/diagrams/DataInputAssociationFlowIcon.tsx';
import DataOutputAssociationFlowIcon from '../assets/icons/diagrams/DataOutputAssociationFlowIcon.tsx';
import DataObjectIcon from '../assets/icons/diagrams/DataObjectIcon.tsx';
import AssociationFlowIcon from '../assets/icons/diagrams/AssociationFlowIcon.tsx';
import EventBasedGatewayIcon from '../assets/icons/diagrams/EventBasedGatewayIcon.tsx';
import LaneIcon from '../assets/icons/diagrams/LaneIcon.tsx';


const elementComponents = {
    startEvent: StartEventIcon,
    endEvent: EndEventIcon,
    scriptTask: ScriptTaskIcon,
    userTask: UserTaskIcon,
    parallelGateway: ParallelGatewayIcon,
    participant: ParticipantIcon,
    serviceTask: ServiceTaskIcon,
    exclusiveGateway: ExclusiveGatewayIcon,
    dataInput: DataInputIcon,
    sendTask: SendTaskIcon,
    dataOutput: DataOutputIcon,
    task: TaskIcon,
    textAnnotation: TextAnnotationIcon,
    dataObject: DataObjectIcon,
    eventBasedGateway: EventBasedGatewayIcon,
    lane: LaneIcon
    
};

const flowElementComponents = {
    sequenceFlow: SequenceFlowIcon,
    messageFlow: MessageFlowIcon,
    dataInputAssociation: DataInputAssociationFlowIcon,
    dataOutputAssociation: DataOutputAssociationFlowIcon,
    association: AssociationFlowIcon
}

const DiagramRenderer = () => {
    const location = useLocation();
    const diagramData = location.state?.diagramData?.xml_content;
    const diagramName = location.state?.diagramName;  

    useEffect(() => {
        console.log(diagramData); // Debug
    }, [diagramData]);

    const renderElement = (key, element) => {
        if (element.Bounds) {
            const { x = 0, y = 0, width = 50, height = 50 } = element.Bounds;
            const ElementComponent = elementComponents[element.elementType];
    
            if (!ElementComponent) {
                console.log('Unrecognized element: ', element);
                return null;
            }
    
            return (
                <div
                    id={key}
                    style={{
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        border: `1px solid black`
                    }}>
                    <ElementComponent 
                        width={width} 
                        height={height} 
                    />
                </div>
            );
        } else if (flowElementComponents[element.elementType]) {
    
            const FlowElementComponent = flowElementComponents[element.elementType]
            if (!FlowElementComponent) {
                console.log('Unrecognized flow element: ', element);
                return null;
            }
    
            const waypoints = Object.keys(element)
                .filter(key => key.startsWith('waypoint'))
                .map(key => element[key]);
            if (waypoints.length > 1) {
                return (
                    <div id={key}>
                        <FlowElementComponent waypoints={waypoints}/>
                    </div>
                );
            } else {
                console.log('There must be at least 2 waypoints in element flow: ', element)
                return null;
            }
        }
    
        return null;
    };

    if (!diagramData) {
        return <div>No diagram data available</div>;
    }

    return (
        <div className="container">
            <h2 className="title">Visualization of: {diagramName}</h2>
            <div id="diagram" className="diagramVisualization">
                {Object.entries(diagramData).map(([key, element]) => renderElement(key, element))}
            </div>
        </div>
    );
    
    
};

export default DiagramRenderer;
