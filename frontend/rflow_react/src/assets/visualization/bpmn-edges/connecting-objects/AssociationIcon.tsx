import React from 'react';

interface AssociationIconProps {
  points: string;
}

const AssociationIcon: React.FC<AssociationIconProps> = ({ points }) => {
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', height: 1, width: 1 }} viewBox="0 0 1 1">
      <polyline
        points={points}
        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeDasharray: '5, 5' }}
      />
    </svg>
  );
};

export default AssociationIcon;
