import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteDiagram, downloadFile } from '../services/DiagramService';
import '../styles/DiagramRenderer.css';

/* -User Interface Components- */
import { InfoIconButton } from '../assets/ui/InfoIcon.jsx';
import { UserIconButton } from '../assets/ui/UserIcon.jsx';
import { DownloadFileIconButton } from '../assets/ui/DownloadFileIcon.jsx';
import { DeleteCircleIconButton } from '../assets/ui/DeleteCircleIcon.jsx';
import { BackIconButton } from '../assets/ui/BackIcon.jsx';

/* -Modals- */
import InfoModal from './modals/InfoModal';
import UserOptionsModal from './modals/UserOptionsModal';
import ConfirmationModal from './modals/ConfirmationModal';

/* -BPMN Shapes- */

// artifacts
import TextAnnotationIcon from '../assets/visualization/bpmn-shapes/artifacts/TextAnnotationIcon.tsx';
// call activities
// call choreographies
// choreography participant bands
// choreography tasks
// collapsed ad hoc sub-processes
// collapsed call activities
// collapsed call choreographies
// collapsed event sub-processes
// collapsed sub-choreographies
// collapsed sub-processes
// collapsed transactions
// conversations
// data
import DataInputIcon from '../assets/visualization/bpmn-shapes/data/DataInputIcon.tsx';
import DataObjectIcon from '../assets/visualization/bpmn-shapes/data/DataObjectIcon.tsx';
import DataOutputIcon from '../assets/visualization/bpmn-shapes/data/DataOutputIcon.tsx';
// events
import NoneStartEventIcon from '../assets/visualization/bpmn-shapes/events/NoneStartEventIcon.tsx';
import NonInterruptingMessageStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingMessageStartEventIcon.tsx';
import TimerIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/TimerIntermediateEventIcon.tsx';
import CatchSignalIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/CatchSignalIntermediateEventIcon.tsx';
import NoneEndEventIcon from '../assets/visualization/bpmn-shapes/events/NoneEndEventIcon.tsx';
import TerminateEndEventIcon from '../assets/visualization/bpmn-shapes/events/TerminateEndEventIcon.tsx';
import InterruptingNoneIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingNoneIntermediateEventIcon.tsx';
import ThrowCompensationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/ThrowCompensationIntermediateEventIcon.tsx';
import InterruptingBoundaryTimerIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingBoundaryTimerIntermediateEventIcon.tsx';
import MessageEndEventIcon from '../assets/visualization/bpmn-shapes/events/MessageEndEventIcon.tsx';
// expanded ad hoc sub-processes
// expanded call activities
// expanded call choreographies
// expanded event sub-processes
// expanded sub-choreographies
// expanded sub-processes
// expanded transactions
// gateways
import InclusiveGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/InclusiveGatewayIcon.tsx';
import ParallelGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/ParallelGatewayIcon.tsx';
import ExclusiveGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/ExclusiveGatewayIcon.tsx';
import ExclusiveGatewayWithMarkerIcon from '../assets/visualization/bpmn-shapes/gateways/ExclusiveGatewayWithMarkerIcon.tsx';
import EventBasedGatewayIcon from '../assets/visualization/bpmn-shapes/gateways/EventBasedGatewayIcon.tsx';
// lanes
import HorizontalLaneIcon from '../assets/visualization/bpmn-shapes/lanes/HorizontalLaneIcon.tsx';
// loop markers
// pools
import HorizontalPoolIcon from '../assets/visualization/bpmn-shapes/pools/HorizontalPoolIcon.tsx';
// tasks
import AbstractTaskIcon from '../assets/visualization/bpmn-shapes/tasks/AbstractTaskIcon.tsx';
import SendTaskIcon from '../assets/visualization/bpmn-shapes/tasks/SendTaskIcon.tsx';
import ScriptTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ScriptTaskIcon.tsx';
import UserTaskIcon from '../assets/visualization/bpmn-shapes/tasks/UserTaskIcon.tsx';
import ServiceTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ServiceTaskIcon.tsx';


/* -BPMN Edges- */

// connecting objects
import SequenceFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/SequenceFlowIcon.tsx';
import AssociationIcon from '../assets/visualization/bpmn-edges/connecting-objects/AssociationIcon.tsx';
import MessageFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/MessageFlowIcon.tsx';
import DataInputAssociationFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/DataInputAssociationFlowIcon.tsx'; // Directed data association
import DataOutputAssociationFlowIcon from '../assets/visualization/bpmn-edges/connecting-objects/DataOutputAssociationFlowIcon.tsx'; // Directed data association


const bpmnShapesComponents = {
    // artifacts
    textAnnotation: TextAnnotationIcon,
    // call activities
    // call choreographies
    // choreography participant bands
    // choreography tasks
    // collapsed ad hoc sub-processes
    // collapsed call activities
    // collapsed call choreographies
    // collapsed event sub-processes
    // collapsed sub-choreographies
    // collapsed sub-processes
    // collapsed transactions
    // conversations
    // data
    dataInput: DataInputIcon,
    dataOutput: DataOutputIcon,
    dataObject: DataObjectIcon,
    // events
    noneStartEvent: NoneStartEventIcon, 
    nonInterruptingMessageStartEvent: NonInterruptingMessageStartEventIcon,
    timerIntermediateEvent: TimerIntermediateEventIcon,
    catchSignalIntermediateEvent: CatchSignalIntermediateEventIcon,
    noneEndEvent: NoneEndEventIcon,
    terminateEndEvent: TerminateEndEventIcon,
    interruptingNoneIntermediateEvent: InterruptingNoneIntermediateEventIcon,
    throwCompensationIntermediateEvent: ThrowCompensationIntermediateEventIcon,
    interruptingBoundaryTimerIntermediateEvent: InterruptingBoundaryTimerIntermediateEventIcon,
    messageEndEvent: MessageEndEventIcon,
    // expanded ad hoc sub-processes
    // expanded call activities
    // expanded call choreographies
    // expanded event sub-processes
    // expanded sub-choreographies
    // expanded sub-processes
    // expanded transactions
    // gateways
    inclusiveGateway: InclusiveGatewayIcon,
    parallelGateway: ParallelGatewayIcon,
    eventBasedGateway: EventBasedGatewayIcon,
    exclusiveGateway: ExclusiveGatewayIcon,
    exclusiveGatewayWithMarker: ExclusiveGatewayWithMarkerIcon, 
    // lanes
    horizontalLane: HorizontalLaneIcon,
    // loop markers
    // pools
    horizontalPool: HorizontalPoolIcon,
    // tasks
    abstractTask: AbstractTaskIcon,
    sendTask: SendTaskIcon,
    scriptTask: ScriptTaskIcon,
    userTask: UserTaskIcon,
    serviceTask: ServiceTaskIcon,
};

const bpmnEdgesComponents = {
    // connecting objects
    sequenceFlow: SequenceFlowIcon,
    messageFlow: MessageFlowIcon,
    dataInputAssociation: DataInputAssociationFlowIcon,
    dataOutputAssociation: DataOutputAssociationFlowIcon,
    association: AssociationIcon
}

// These elements are not used in the visualization
const unusedElementComponents = [
    'definitions', 
    'laneSet', 
    'collaboration', 
    'BPMNDiagram', 
    'process', 
    'message',
    'subProcess',
    'b'
];

const DiagramRenderer = () => {
    const refsMap = useRef({});
    const location = useLocation();
    const navigate = useNavigate();
    const diagramData = location.state?.diagramData?.xml_content;
    const diagramName = location.state?.diagramName;
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isUserOptionsModalOpen, setIsUserOptionsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
    }, [navigate]);

    const renderElement = (key, element) => {
        const { elementType, Bounds } = element;
        const ElementComponent = bpmnShapesComponents[elementType] || bpmnEdgesComponents[elementType];
        if (!refsMap.current[key]) {
            refsMap.current[key] = React.createRef();
        }
        const draggableRef = refsMap.current[key];

        if (!ElementComponent) {
            if (unusedElementComponents.includes(elementType)) {
                return null;
            }
            console.log('Unrecognized element: ', key, element);
            return null;
        }

        if (Bounds) {
            const { x, y, width, height } = Bounds;
            return (
                <Draggable 
                    key={key}
                    nodeRef={draggableRef}>
                <div
                    ref={draggableRef}
                    id={key}
                    className={element.elementType === 'horizontalPool' ? 'participant' :
                    element.elementType === 'horizontalLane' || element.elementType === 'verticalLane' ? 'lane' :
                    'element'}
                    style={{
                    position: 'absolute', 
                    overflow: 'visible',
                    left: `${x}px`,
                    top: `${y}px`,
                    height: `${height}px`,
                    width: `${width}px`  
                    }}>
                    <ElementComponent/>
                </div>
                </Draggable>
            );
        } else if (bpmnEdgesComponents[elementType]) {
            const waypoints = Object.keys(element)
                .filter(key => key.startsWith('waypoint'))
                .map(key => element[key]);
        
            if (waypoints && waypoints.length > 1) {
                const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');
        
                return (
                    <Draggable key={key} nodeRef={draggableRef}>
                    <div 
                        ref={draggableRef}
                        id={key} 
                        className='flow-element'>
                        <ElementComponent points={points} />
                    </div>
                    </Draggable>
                );
            } else {
                console.log('There must be at least 2 waypoints in element flow: ', element);
                return null;
            }
        }
        

        return null;
    };

    const handleInfo = () => setIsInfoModalOpen(true);
    const handleUserOptions = () => setIsUserOptionsModalOpen(true);
    const handleDownload = async () => {
        try {
            await downloadFile(location.state.diagramId);
            toast.success('Diagram downloaded successfully');
        } catch (error) {
            console.error('Error downloading file:', error);
            toast.error('Error downloading file');
        }
    };
    const handleDelete = async () => {
        try {
            await deleteDiagram(location.state.diagramId);
            navigate('/');
            toast.success('Diagram deleted successfully');
        } catch (error) {
            console.error('Error deleting diagram:', error);
            toast.error('Error deleting diagram');
        }
    };
    const confirmDelete = () => setIsConfirmationModalOpen(true);
    const handleBack = () => navigate('/');
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    if (!diagramData) {
        return <div>No diagram data available</div>;
    }

    return (
        <div>
            <ToastContainer />
            <div className="app-header">
                <BackIconButton width="40" height="40" onClick={handleBack} className="app-header-button" />
                <InfoIconButton width="40" height="40" onClick={handleInfo} className="app-header-button" />
                <DownloadFileIconButton width="40" height="40" onClick={handleDownload} className="app-header-button" />
                <DeleteCircleIconButton width="40" height="40" onClick={confirmDelete} className="app-header-button" />
                <UserIconButton width="40" height="40" onClick={handleUserOptions} className="app-header-button" />
            </div>
            <div>
                <h2 className="diagram-visualization-title">{diagramName}</h2>
            </div>
            <div 
                className="diagram-visualization">
                {Object.entries(diagramData).map(([key, element]) => renderElement(key, element))}
            </div>
            <InfoModal 
                isOpen={isInfoModalOpen} 
                toggle={() => setIsInfoModalOpen(false)} 
                diagramData={diagramData} />
            <UserOptionsModal 
                isOpen={isUserOptionsModalOpen} 
                toggle={() => setIsUserOptionsModalOpen(false)} 
                handleLogout={handleLogout} />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                toggle={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this diagram?"/>
        </div>
    );
};

export default DiagramRenderer;