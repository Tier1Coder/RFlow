import React from 'react';
import Draggable from 'react-draggable';
import {
  bpmnShapesComponents,
  bpmnEdgesComponents,
  unusedElementComponents,
} from '../data/bpmnComponents';

/**
 * DiagramElement Component
 *
 * Renders a single BPMN element based on its type.
 *
 * @param {Object} props - Component props.
 * @param {string} props.elementId - Unique ID of the element (from the key).
 * @param {Object} props.element - BPMN element data.
 * @param {number} props.scale - Current scale factor.
 * @param {Object} props.refsMap - Reference map for draggable elements.
 * @param {Set} props.hiddenElements - Set of hidden element IDs.
 * @param {Function} props.setHiddenElements - Function to update hidden elements.
 * @returns {JSX.Element|null} Rendered element or null.
 */
const DiagramElement = ({
  elementId,
  element,
  scale,
  refsMap,
  hiddenElements,
  setHiddenElements,
}) => {
  const { elementType, Bounds } = element;
  const ElementComponent = bpmnShapesComponents[elementType] || bpmnEdgesComponents[elementType];
  const elementsToHide = ['subProcessCollapsed', 'nonInterruptingMessageEventSubProcessCollapsed', 'callActivityCollapsed'];

  if (!ElementComponent) {
    if (unusedElementComponents.includes(elementType)) {
      return null;
    }
    console.warn('Unrecognized element:', elementType, element);
    return null;
  }

  const key = elementId;

  if (!refsMap.current[key]) {
    refsMap.current[key] = React.createRef();
  }
  const draggableRef = refsMap.current[key];

  const handleClick = () => {
    if (elementsToHide.includes(elementType)) {
      setHiddenElements((prevState) => {
        const newSet = new Set(prevState);
        if (newSet.has(key)) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        return newSet;
      });
    }
  };

  const isHidden = hiddenElements.has(key);

  // Determine z-index based on elementType
  let zIndex = 3; // Default z-index for shapes

  if (
    elementsToHide.includes(elementType)
  ) {
    zIndex = 10; // Set higher z-index for collapsed elements
  }

  if (Bounds) {
    const { x, y, width, height } = Bounds;
    const className = !element.zIndex 
    ? (element.elementType === 'horizontalPool' 
        ? 'diagram-element-participant' 
        : (element.elementType === 'horizontalLane'
            ? 'diagram-shape-horizontal-lane'
            : (['verticalLane'].includes(element.elementType) 
                ? 'diagram-element-lane' 
                : 'diagram-shape'))) 
    : '';

    return (
      <Draggable key={key} nodeRef={draggableRef}>
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
            width: `${width}px`,
            display: isHidden ? 'none' : 'block',
            zIndex, // Set z-index based on elementType
          }}
          onClick={handleClick}
        >
          <ElementComponent name={element.name || ''} text={element.text1?.text || ''} />
        </div>
      </Draggable>
    );
  } else if (bpmnEdgesComponents[elementType]) {
    // Handle edge elements (connections)
    const waypoints = Object.keys(element)
      .filter((key) => key.startsWith('waypoint'))
      .map((key) => element[key]);

    if (waypoints.length > 1) {
      const points = waypoints.map((wp) => `${wp.x},${wp.y}`).join(' ');

      return (
        <Draggable key={key} nodeRef={draggableRef}>
          <div
            ref={draggableRef}
            id={key}
            className="diagram-edge"
            style={{ display: isHidden ? 'none' : 'block' }}
            onClick={handleClick}
          >
            <ElementComponent points={points} scale={scale} />
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
