import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteDiagram, downloadFile } from '../services/DiagramService.js';
import '../styles/components/DiagramVisualization.css';
import { AppLogoIcon } from '../assets/app/AppLogoIcon.jsx';

/* -User Interface Components- */
import { InfoIconButton } from '../assets/ui/InfoIcon.jsx';
import { UserIconButton } from '../assets/ui/UserIcon.jsx';
import { DownloadFileIconButton } from '../assets/ui/DownloadFileIcon.jsx';
import { DeleteCircleIconButton } from '../assets/ui/DeleteCircleIcon.jsx';
import { BackIconButton } from '../assets/ui/BackIcon.jsx';

/* -Modals- */
import InfoModal from './modals/InfoModal.js';
import UserOptionsModal from './modals/UserOptionsModal.js';
import ConfirmationModal from './modals/ConfirmationModal.js';

/* -BPMN Shapes- */

// artifacts
import TextAnnotationIcon from '../assets/visualization/bpmn-shapes/artifacts/TextAnnotationIcon.tsx';
// call activities
// call choreographies
// choreography participant bands
// choreography tasks
// collapsed ad hoc sub-processes
// collapsed call activities
import CallActivityCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-call-activities/CallActivityCollapsedIcon.tsx';
// collapsed call choreographies
// collapsed event sub-processes
import NonInterruptingMessageEventSubProcessCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-event-sub-processes/NonInterruptingMessageEventSubProcessCollapsedIcon.tsx';
// collapsed sub-choreographies
// collapsed sub-processes
import SubProcessCollapsedIcon from '../assets/visualization/bpmn-shapes/collapsed-sub-processes/SubProcessCollapsedIcon.tsx';
// collapsed transactions
// conversations
// data
import DataInputIcon from '../assets/visualization/bpmn-shapes/data/DataInputIcon.tsx';
import DataObjectIcon from '../assets/visualization/bpmn-shapes/data/DataObjectIcon.tsx';
import DataOutputIcon from '../assets/visualization/bpmn-shapes/data/DataOutputIcon.tsx';
import DataStoreReferenceIcon from '../assets/visualization/bpmn-shapes/data/DataStoreReferenceIcon.tsx';
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
import NonInterruptingTimerStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingTimerStartEventIcon.tsx';
import InterruptingTimerStartEventIcon from '../assets/visualization/bpmn-shapes/events/InterruptingTimerStartEventIcon.tsx';
import BoundaryCatchErrorIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/BoundaryCatchErrorIntermediateEventIcon.tsx';
import BoundaryCatchCompensationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/BoundaryCatchCompensationIntermediateEventIcon.tsx';
import NonInterruptingConditionalStartEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingConditionalStartEventIcon.tsx';
import ErrorEndEventIcon from '../assets/visualization/bpmn-shapes/events/ErrorEndEventIcon.tsx';
import ThrowEscalationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/ThrowEscalationIntermediateEventIcon.tsx';
import NonInterruptingBoundaryCatchEscalationIntermediateEventIcon from '../assets/visualization/bpmn-shapes/events/NonInterruptingBoundaryCatchEscalationIntermediateEventIcon.tsx';
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
import ReceiveTaskIcon from '../assets/visualization/bpmn-shapes/tasks/ReceiveTaskIcon.tsx';


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
    callActivityCollapsed: CallActivityCollapsedIcon,
    // collapsed call choreographies
    // collapsed event sub-processes
    nonInterruptingMessageEventSubProcessCollapsed: NonInterruptingMessageEventSubProcessCollapsedIcon,
    // collapsed sub-choreographies
    // collapsed sub-processes
    subProcessCollapsed: SubProcessCollapsedIcon,
    // collapsed transactions
    // conversations
    // data
    dataInput: DataInputIcon,
    dataOutput: DataOutputIcon,
    dataObject: DataObjectIcon,
    dataStoreReference: DataStoreReferenceIcon,
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
    nonInterruptingTimerStartEvent: NonInterruptingTimerStartEventIcon,
    interruptingTimerStartEvent: InterruptingTimerStartEventIcon,
    boundaryCatchErrorIntermediateEvent: BoundaryCatchErrorIntermediateEventIcon,
    boundaryCatchCompensationIntermediateEvent: BoundaryCatchCompensationIntermediateEventIcon,
    nonInterruptingConditionalStartEvent: NonInterruptingConditionalStartEventIcon,
    errorEndEvent: ErrorEndEventIcon,
    throwEscalationIntermediateEvent: ThrowEscalationIntermediateEventIcon,
    nonInterruptingBoundaryCatchEscalationIntermediateEvent: NonInterruptingBoundaryCatchEscalationIntermediateEventIcon,
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
    receiveTask: ReceiveTaskIcon,
};

const bpmnEdgesComponents = {
    // connecting objects
    sequenceFlow: SequenceFlowIcon,
    messageFlow: MessageFlowIcon,
    dataInputAssociation: DataInputAssociationFlowIcon,
    dataOutputAssociation: DataOutputAssociationFlowIcon,
    association: AssociationIcon
}

// These elements are not used in the visualization (they are only logical and do not have a graphical representation)
const unusedElementComponents = [
    'definitions', 
    'laneSet', 
    'collaboration', 
    'BPMNDiagram', 
    'process', 
    'message',
    'dataStore'
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
    const diagramVisualizationRef = useRef(null);
    const [scaledDiagramData, setScaledDiagramData] = useState(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
        if (!diagramData || !diagramVisualizationRef.current) {
            return;
        }
    
        const outerDiv = diagramVisualizationRef.current;
    
        const calculateScaledDiagramData = () => {
            const outerDivWidth = outerDiv.clientWidth;
            const outerDivHeight = outerDiv.clientHeight;
    
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            Object.values(diagramData).forEach((element) => {
                const { Bounds } = element;
                if (Bounds) {
                    const { x: xStr, y: yStr, width: widthStr, height: heightStr } = Bounds;
                    const x = parseFloat(xStr);
                    const y = parseFloat(yStr);
                    const width = parseFloat(widthStr);
                    const height = parseFloat(heightStr);
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x + width);
                    maxY = Math.max(maxY, y + height);
                } else if (element.waypoint1 && element.waypoint2) {
                    const waypoints = Object.keys(element)
                        .filter(key => key.startsWith('waypoint'))
                        .map(key => element[key]);
    
                    waypoints.forEach(({ x: xStr, y: yStr }) => {
                        const x = parseFloat(xStr);
                        const y = parseFloat(yStr);
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    });
                }
            });
    
            const diagramWidth = maxX - minX;
            const diagramHeight = maxY - minY;
    
            const scaleX = outerDivWidth / diagramWidth;
            const scaleY = outerDivHeight / diagramHeight;
            const scale = Math.min(scaleX, scaleY);
            setScale(scale);
    
            const newScaledDiagramData = {};
    
            Object.entries(diagramData).forEach(([key, element]) => {
                const scaledElement = { ...element };
    
                if (element.Bounds) {
                    const { x: xStr, y: yStr, width: widthStr, height: heightStr } = element.Bounds;
                    const x = parseFloat(xStr);
                    const y = parseFloat(yStr);
                    const width = parseFloat(widthStr);
                    const height = parseFloat(heightStr);
                    scaledElement.Bounds = {
                        x: (x - minX) * scale,
                        y: (y - minY) * scale,
                        width: width * scale,
                        height: height * scale
                    };
                } else if (element.waypoint1 && element.waypoint2) {
                    const waypoints = Object.keys(element)
                        .filter(key => key.startsWith('waypoint'))
                        .reduce((acc, waypointKey) => {
                            const { x: xStr, y: yStr } = element[waypointKey];
                            const x = parseFloat(xStr);
                            const y = parseFloat(yStr);
                            acc[waypointKey] = {
                                x: (x - minX) * scale,
                                y: (y - minY) * scale
                            };
                            return acc;
                        }, {});
                    Object.assign(scaledElement, waypoints);
                }
    
                newScaledDiagramData[key] = scaledElement;
            });
            setScaledDiagramData(newScaledDiagramData);
        };
    
        calculateScaledDiagramData();
    
        const handleResize = () => {
            calculateScaledDiagramData();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate, diagramData]);
    

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
                    className={
                        !element.zIndex 
                          ? (element.elementType === 'horizontalPool' ? 'diagram-visualization-participant' 
                            : element.elementType === 'horizontalLane' || element.elementType === 'verticalLane' ? 'diagram-visualization-lane' 
                              : 'diagram-visualization-element') 
                          : ''
                      }
                      
                    style={{
                    position: 'absolute', 
                    overflow: 'visible',
                    left: `${x}px`,
                    top: `${y}px`,
                    height: `${height}px`,
                    width: `${width}px`  
                    }}>
                    <ElementComponent name={element.name || ""} text={element.text1?.text || ""} />
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
                        className='diagram-visualization-flow-element'>
                        <ElementComponent 
                            points={points} 
                            scale={scale}
                        />
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
                <div className="app-header-icons">
                <div className="app-header-logo">
                    <AppLogoIcon width="80" height="80" />
                </div>
                <BackIconButton width="40" height="40" onClick={handleBack} className="app-header-button" />
                <UserIconButton width="40" height="40" onClick={handleUserOptions} className="app-header-button" />
            </div>
            </div>
            <div>
                <h2 className="diagram-visualization-title">{diagramName}</h2>
            </div>
            <div className="diagram-visualization-container">
                <div className="diagram-visualization-toolbox">
                    <InfoIconButton width="40" height="40" onClick={handleInfo} className="diagram-visualization-toolbox-icon" />
                    <DownloadFileIconButton width="40" height="40" onClick={handleDownload} className="diagram-visualization-toolbox-icon" />
                    <DeleteCircleIconButton width="40" height="40" onClick={confirmDelete} className="diagram-visualization-toolbox-icon" />
                </div>
                <div className="diagram-visualization" ref={diagramVisualizationRef}>
                    {scaledDiagramData && Object.entries(scaledDiagramData).map(([key, element]) => renderElement(key, element))}
                </div>
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