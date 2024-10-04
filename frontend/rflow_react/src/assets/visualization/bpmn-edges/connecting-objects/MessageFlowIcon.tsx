import React from 'react';

interface MessageFlowIconProps {
  points: string;
  scale: number;
}

const MessageFlowIcon: React.FC<MessageFlowIconProps> = ({ points, scale = 1 }) => {
  const strokeWidth = 2 * scale; 
  const markerSize = 6 * scale;  

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'visible',
        width: 1,
        height: 1,
      }}
      viewBox="0 0 1 1"
    >
      <defs>
        <marker
          id="openArrowhead"
          markerWidth={markerSize}
          markerHeight={markerSize}
          refX={markerSize / 2}
          refY={markerSize / 2}
          orient="auto"
        >
          <polygon
            points={`0,0 ${markerSize},${markerSize / 2} 0,${markerSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </marker>
        <marker
          id="emptyDot"
          markerWidth={markerSize}
          markerHeight={markerSize}
          refX={markerSize / 2}
          refY={markerSize / 2}
          orient="auto"
        >
          <circle
            cx={markerSize / 2}
            cy={markerSize / 2}
            r={(markerSize / 2) - (strokeWidth / 2)}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </marker>
      </defs>
      <polyline
        points={points}
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: strokeWidth,
          strokeDasharray: `${6 * scale},${3 * scale}`,
        }}
        markerStart="url(#emptyDot)"
        markerEnd="url(#openArrowhead)"
      />
    </svg>
  );
};

export default MessageFlowIcon;
