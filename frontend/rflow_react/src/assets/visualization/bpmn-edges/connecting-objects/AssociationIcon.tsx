import React from 'react';
import { connectingObjectSvgStyle, dashedPolylineStyle, viewBox } from '../consts.tsx';

interface AssociationIconProps {
  points: string;
  scale: number;
}

const AssociationIcon: React.FC<AssociationIconProps> = ({ points, scale = 1 }) => {
  return (
    <svg
      style={connectingObjectSvgStyle}
      viewBox={viewBox}
    >
      <polyline
        points={points}
        style={dashedPolylineStyle(scale, 2)}
      />
    </svg>
  );
};

export default AssociationIcon;