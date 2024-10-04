import React from 'react';

interface AssociationIconProps {
  points: string;
  scale: number;
}

const AssociationIcon: React.FC<AssociationIconProps> = ({ points, scale = 1 }) => {
  const strokeWidth = 2 * scale; 
  const dashArray = `${5 * scale}, ${5 * scale}`;
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'visible',
        height: 1,
        width: 1,
      }}
      viewBox="0 0 1 1"
    >
      <polyline
        points={points}
        style={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: strokeWidth,
          strokeDasharray: dashArray,
        }}
      />
    </svg>
  );
};

export default AssociationIcon;
