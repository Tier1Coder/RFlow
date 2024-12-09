import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { deleteDiagram, downloadFile } from '../services/DiagramService.js';
import '../styles/components/DiagramVisualization.css';

import AppHeader from './AppHeader.js';
import DiagramElement from './DiagramElement.js';
import DiagramToolbox from './DiagramToolbox.js';
import { UserIconButton } from '../assets/ui/UserIcon.jsx';
import { BackIconButton } from '../assets/ui/BackIcon.jsx';

import InfoModal from './modals/InfoModal.js';
import UserOptionsModal from './modals/UserOptionsModal.js';
import ConfirmationModal from './modals/ConfirmationModal.js';

const DiagramVisualization = () => {
    const refsMap = useRef({});
    const location = useLocation();
    const navigate = useNavigate();
    const diagramData = location.state?.diagramData?.xml_content || location.state?.innerElements;
    const diagramName = location.state?.diagramName || 'Nested Diagram';
    const diagramId = location.state?.diagramId;
    const diagramVisualizationRef = useRef(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isUserOptionsModalOpen, setIsUserOptionsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    /**
     * Redirect to login if not authenticated.
     */
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
    }, [navigate]);

    /**
     * Renders a diagram element.
     * 
     * @param {string} key - Unique key for the element.
     * @param {Object} element - BPMN element data.
     * @returns {JSX.Element|null} Rendered element or null.
     */
    const renderElement = (key, element) => (
        <DiagramElement
            key={key}
            elementId={key}
            element={element}
            refsMap={refsMap}
            onCollapseClick={handleCollapseClick}
        />
    );

    /**
     * Handles opening different modals based on modal name.
     */
    const handleOpenModal = (modalName) => {
        switch (modalName) {
            case 'helpModal':
                setIsHelpModalOpen(true);
                break;
            case 'userOptionsModal':
                setIsUserOptionsModalOpen(true);
                break;
            default:
                break;
        }
    };

    /**
     * Handles closing different modals based on modal name.
     */
    const handleCloseModal = (modalName) => {
        switch (modalName) {
            case 'helpModal':
                setIsHelpModalOpen(false);
                break;
            case 'userOptionsModal':
                setIsUserOptionsModalOpen(false);
                break;
            default:
                break;
        }
    };

    /**
     * Handles downloading the diagram file.
     */
    const handleDownload = async () => {
        try {
            await downloadFile(diagramId);
            toast.success('Diagram downloaded successfully');
        } catch (error) {
            toast.error('Error downloading file');
        }
    };

    /**
     * Handles deleting the diagram.
     */
    const handleDelete = async () => {
        try {
            await deleteDiagram(diagramId);
            navigate('/');
            toast.success('Diagram deleted successfully');
        } catch (error) {
            toast.error('Error deleting diagram');
        }
    };

    /**
     * Confirms deletion of the diagram.
     */
    const confirmDelete = () => setIsConfirmationModalOpen(true);

    /**
     * Handles navigating back to the main page.
     */
    const handleBack = () => navigate('/');

    /**
     * Handles user logout.
     */
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    /**
     * Handles click on a collapsed element.
     * 
     * @param {Object} element - Collapsed element data.
     */
    const handleCollapseClick = (element) => {
        const parentX = Number(element.Bounds.x);
        const parentY = Number(element.Bounds.y);
        const parentWidth = Number(element.Bounds.width);
        const parentHeight = Number(element.Bounds.height);
    
        const innerElements = Object.entries(diagramData)
            .filter(([key, value]) => {
                // Skip the parent element itself
                if (key === element.attributes.id) return false;
    
                let isShapeInside = false;
                let isEdgeInside = false;
                
                if (value.Bounds) {
                    const childX = Number(value.Bounds.x);
                    const childY = Number(value.Bounds.y);
                    const childWidth = Number(value.Bounds.width);
                    const childHeight = Number(value.Bounds.height);
    
                    isShapeInside = (
                        childX >= parentX &&
                        childY >= parentY &&
                        (childX + childWidth) <= (parentX + parentWidth) &&
                        (childY + childHeight) <= (parentY + parentHeight)
                    );
                }
    
                if (value.waypoint1) {
                    const waypointKeys = Object.keys(value).filter(k => k.startsWith("waypoint"));
    
                    isEdgeInside = waypointKeys.some((waypointKey) => {
                        const wx = Number(value[waypointKey].x);
                        const wy = Number(value[waypointKey].y);
                        return (
                            wx > parentX &&
                            wy > parentY &&
                            wx < parentX + parentWidth &&
                            wy < parentY + parentHeight
                        );
                    });
                }
    
                return isShapeInside || isEdgeInside;
            })
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    
        navigate(`/visualize/${diagramId}/collapsed/${element.attributes.id}`, {
            state: {
                diagramData: { xml_content: innerElements },
                diagramName: `${diagramName} - inside ${element.attributes.id}`,
                diagramId: element.attributes.id,
            },
        });
    };

    if (!diagramData) {
        return <div>No diagram data available</div>;
    }

    return (
        <div>
            <ToastContainer />
            <AppHeader>
                <BackIconButton
                    width="40"
                    height="40"
                    onClick={handleBack}
                    className="app-header-button"
                />
                <UserIconButton
                    width="40"
                    height="40"
                    onClick={() => handleOpenModal('userOptionsModal')}
                    className="app-header-button"
                />
            </AppHeader>
            <div className="diagram-visualization-title">
                <h2>{diagramName}</h2>
            </div>
            <div className="diagram-visualization-container">
                <DiagramToolbox
                    onInfo={() => handleOpenModal('helpModal')}
                    onDownload={handleDownload}
                    onDelete={confirmDelete}
                />
                <div className="diagram-visualization-graphic" ref={diagramVisualizationRef}>
                    {Object.entries(diagramData).map(([key, element]) => renderElement(key, element))}
                </div>
            </div>
            <InfoModal
                isOpen={isHelpModalOpen}
                toggle={() => handleCloseModal('helpModal')}
                diagramData={diagramData}
            />
            <UserOptionsModal
                isOpen={isUserOptionsModalOpen}
                toggle={() => handleCloseModal('userOptionsModal')}
                handleLogout={handleLogout}
            />
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                toggle={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this diagram?"
            />
        </div>
    );
};

export default DiagramVisualization;
