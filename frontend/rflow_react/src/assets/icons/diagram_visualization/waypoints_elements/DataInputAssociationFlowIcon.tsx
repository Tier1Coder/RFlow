import React from 'react';

interface DataInputAssociationFlowIconProps {
  points: string;
}

const DataInputAssociationFlowIcon: React.FC<DataInputAssociationFlowIconProps> = ({ points }) => {
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', width: 1, height: 1 }} viewBox="0 0 1 1">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
        </marker>
      </defs>
      <polyline
        points={points}
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeDasharray: '5,5' // Dashed line for Data Input Association
        }}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default DataInputAssociationFlowIcon;