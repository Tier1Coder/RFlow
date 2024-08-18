import React from 'react';

interface AssociationFlowIconProps {
  waypoints: { x: number; y: number }[];
}

const AssociationFlowIcon: React.FC<AssociationFlowIconProps> = ({ waypoints }) => {
  const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');

  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <polyline
        points={points}
        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeDasharray: '5, 5' }}
      />
    </svg>
  );
};

export default AssociationFlowIcon;
