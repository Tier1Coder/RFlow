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
 * @param {Function} props.onCollapseClick - Handler for collapsed element click.
 * @returns {JSX.Element|null} Rendered element or null.
 */
const DiagramElement = ({
  elementId,
  element,
  scale,
  refsMap,
  onCollapseClick,
}) => {
  const { elementType, Bounds } = element;
  const ElementComponent = bpmnShapesComponents[elementType] || bpmnEdgesComponents[elementType];
  const collapsedElements = ['subProcessCollapsed', 'nonInterruptingMessageEventSubProcessCollapsed', 'callActivityCollapsed'];

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

  // Determine z-index based on elementType
  let zIndex = 3; // Default z-index for shapes

  if (
    collapsedElements.includes(elementType)
  ) {
    zIndex = 10; // Set higher z-index for collapsed elements
  }

  const isCollapsed = collapsedElements.includes(elementType);

  if (Bounds) {
    const { x, y, width, height } = Bounds;
    const className = !element.zIndex 
      ? (element.elementType === 'horizontalPool' ? 'diagram-element-participant' 
          : (element.elementType === 'horizontalLane' ? 'diagram-shape-horizontal-lane'
              : (['verticalLane'].includes(element.elementType) ? 'diagram-element-lane' 
                  : 'diagram-shape'))) 
      : '';

    const handleClick = () => {
      if (isCollapsed && onCollapseClick) {
        onCollapseClick(element);
      }
    };

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
            zIndex, // Set z-index based on elementType
            cursor: isCollapsed ? 'pointer' : 'default',
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
