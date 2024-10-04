import React from 'react';

interface SequenceFlowIconProps {
  points: string;
  scale: number;
}

const SequenceFlowIcon: React.FC<SequenceFlowIconProps> = ({ points, scale = 1 }) => {
  const markerWidth = 6 * scale;
  const markerHeight = 6 * scale;
  const refX = 5 * scale;
  const refY = 3 * scale;
  const strokeWidth = 1.3 * scale;

  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', height: 1, width: 1 }}
      viewBox="0 0 1 1"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth={markerWidth}
          markerHeight={markerHeight}
          refX={refX}
          refY={refY}
          orient="auto"
        >
          <polygon
            points={`0,0 ${6 * scale},${3 * scale} 0,${6 * scale} 0,0`}
            fill="currentColor"
          />
        </marker>
      </defs>
      <polyline
        points={points}
        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: strokeWidth }}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default SequenceFlowIcon;
