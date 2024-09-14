import React from 'react';

interface MessageFlowIconProps {
  points: string;
}

const MessageFlowIcon: React.FC<MessageFlowIconProps> = ({ points }) => {
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', width: 1, height: 1 }} viewBox="0 0 1 1"> 
      <defs>
        <marker
          id="openArrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0,0 6,3 0,6 1,3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
        <marker
          id="emptyDot"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <circle cx="3" cy="3" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>
      <polyline
        points={points}
        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeDasharray: '6,3' }}
        markerStart="url(#emptyDot)"
        markerEnd="url(#openArrowhead)"
      />
    </svg>
  );
};

export default MessageFlowIcon;