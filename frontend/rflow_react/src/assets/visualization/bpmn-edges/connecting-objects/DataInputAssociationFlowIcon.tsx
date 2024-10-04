import React from 'react';

interface DataInputAssociationFlowIconProps {
  points: string;
  scale: number;
}

const DataInputAssociationFlowIcon: React.FC<DataInputAssociationFlowIconProps> = ({ points, scale = 1 }) => {
  const strokeWidth = 2 * scale;
  const markerWidth = 10 * scale;
  const markerHeight = 7 * scale;
  const refX = 5 * scale;
  const refY = 3.5 * scale;

  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', width: 1, height: 1 }}
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
            points={`0 0, ${10 * scale} ${3.5 * scale}, 0 ${7 * scale}`}
            fill="currentColor"
          />
        </marker>
      </defs>
      <polyline
        points={points}
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: strokeWidth,
          strokeDasharray: `${5 * scale}, ${5 * scale}`,
        }}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default DataInputAssociationFlowIcon;
