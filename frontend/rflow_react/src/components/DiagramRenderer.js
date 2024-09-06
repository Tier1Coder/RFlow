import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DiagramRenderer.css';
import StartEventIcon from '../assets/icons/diagram_visualization/bounds_elements/StartEventIcon.tsx';
import EndEventIcon from '../assets/icons/diagram_visualization/bounds_elements/EndEventIcon.tsx';
import SequenceFlowIcon from '../assets/icons/diagram_visualization/waypoints_elements/SequenceFlowIcon.tsx';
import ScriptTaskIcon from '../assets/icons/diagram_visualization/bounds_elements/ScriptTaskIcon.tsx';
import UserTaskIcon from '../assets/icons/diagram_visualization/bounds_elements/UserTaskIcon.tsx';
import ParallelGatewayIcon from '../assets/icons/diagram_visualization/bounds_elements/ParallelGatewayIcon.tsx';
import ParticipantIcon from '../assets/icons/diagram_visualization/bounds_elements/ParticipantIcon.tsx';
import ServiceTaskIcon from '../assets/icons/diagram_visualization/bounds_elements/ServiceTaskIcon.tsx';
import ExclusiveGatewayIcon from '../assets/icons/diagram_visualization/bounds_elements/ExclusiveGatewayIcon.tsx';
import MessageFlowIcon from '../assets/icons/diagram_visualization/waypoints_elements/MessageFlowIcon.tsx';
import DataInputIcon from '../assets/icons/diagram_visualization/bounds_elements/DataInputIcon.tsx';
import SendTaskIcon from '../assets/icons/diagram_visualization/bounds_elements/SendTaskIcon.tsx';
import DataOutputIcon from '../assets/icons/diagram_visualization/bounds_elements/DataOutputIcon.tsx';
import TaskIcon from '../assets/icons/diagram_visualization/bounds_elements/TaskIcon.tsx';
import TextAnnotationIcon from '../assets/icons/diagram_visualization/bounds_elements/TextAnnotationIcon.tsx';
import DataInputAssociationFlowIcon from '../assets/icons/diagram_visualization/waypoints_elements/DataInputAssociationFlowIcon.tsx';
import DataOutputAssociationFlowIcon from '../assets/icons/diagram_visualization/waypoints_elements/DataOutputAssociationFlowIcon.tsx';
import DataObjectIcon from '../assets/icons/diagram_visualization/bounds_elements/DataObjectIcon.tsx';
import AssociationFlowIcon from '../assets/icons/diagram_visualization/waypoints_elements/AssociationFlowIcon.tsx';
import EventBasedGatewayIcon from '../assets/icons/diagram_visualization/bounds_elements/EventBasedGatewayIcon.tsx';
import LaneIcon from '../assets/icons/diagram_visualization/bounds_elements/LaneIcon.tsx';
import { InfoIconButton } from '../assets/icons/ui/InfoIcon.jsx';
import { UserIconButton } from '../assets/icons/ui/UserIcon.jsx';
import { DownloadFileIconButton } from '../assets/icons/ui/DownloadFileIcon.jsx';
import { DeleteCircleIconButton } from '../assets/icons/ui/DeleteCircleIcon.jsx';
import { BackIconButton } from '../assets/icons/ui/BackIcon.jsx';
import InfoModal from './modals/InfoModal';
import UserOptionsModal from './modals/UserOptionsModal';
import ConfirmationModal from './modals/ConfirmationModal';
import { deleteDiagram, downloadFile } from '../services/DiagramService';
import { ToastContainer, toast } from 'react-toastify';

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
        const ElementComponent = elementComponents[elementType] || flowElementComponents[elementType];

        if (!ElementComponent) {
            console.log('Unrecognized element: ', element);
            return null;
        }

        if (Bounds) {
            const { x, y, width, height } = Bounds;
            return (
                <Draggable key={key}>
                    <div
                        id={key}
                        className={element.elementType === 'participant' ? 'participant' :
                        element.elementType === 'lane' ? 'lane' :
                        'element'}>
                        <ElementComponent x={x} y={y} width={width} height={height} />
                    </div>
                </Draggable>
            );
        } else if (flowElementComponents[elementType]) {
            const waypoints = Object.keys(element)
                .filter(key => key.startsWith('waypoint'))
                .map(key => element[key]);
        
            if (waypoints && waypoints.length > 1) {
                const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');
        
                return (
                    <Draggable key={key}>
                    <div 
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
