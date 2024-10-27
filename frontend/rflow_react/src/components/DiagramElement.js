import React from 'react';
import Draggable from 'react-draggable';
import { bpmnShapesComponents, bpmnEdgesComponents, unusedElementComponents } from '../data/bpmnComponents';
import '../styles/components/DiagramElement.css';

/**
 * DiagramElement Component
 * 
 * Renders a single BPMN element based on its type.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.element - BPMN element data.
 * @param {number} props.scale - Current scale factor.
 * @param {Object} props.refsMap - Reference map for draggable elements.
 * @returns {JSX.Element|null} Rendered element or null.
 */
const DiagramElement = ({ element, scale, refsMap }) => {
    const { elementType, Bounds, id } = element;
    const ElementComponent = bpmnShapesComponents[elementType] || bpmnEdgesComponents[elementType];

    if (!ElementComponent) {
        if (unusedElementComponents.includes(elementType)) {
            return null;
        }
        console.warn('Unrecognized element:', elementType, element);
        return null;
    }

    const key = id || element.name || Math.random(); // Ensure unique key

    if (!refsMap.current[key]) {
        refsMap.current[key] = React.createRef();
    }
    const draggableRef = refsMap.current[key];

    if (Bounds) {
        const { x, y, width, height } = Bounds;
        const className = !element.zIndex 
            ? (element.elementType === 'horizontalPool' 
                ? 'diagram-element-participant' 
                : (['horizontalLane', 'verticalLane'].includes(element.elementType) 
                    ? 'diagram-element-lane' 
                    : 'diagram-shape')) 
            : '';

        return (
            <Draggable 
                key={key}
                nodeRef={draggableRef}>
                <div
                    ref={draggableRef}
                    id={key}
                    className={className}
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

        if (waypoints.length > 1) {
            const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');

            return (
                <Draggable key={key} nodeRef={draggableRef}>
                    <div 
                        ref={draggableRef}
                        id={key} 
                        className='diagram-edge'>
                        <ElementComponent 
                            points={points} 
                            scale={scale}
                        />
                    </div>
                </Draggable>
            );
        } else {
            console.warn('There must be at least 2 waypoints in element flow:', element);
            return null;
        }
    }

    return null;
};

export default DiagramElement;
