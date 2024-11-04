import React from 'react';
import { viewBox, connectingObjectSvgStyle, solidPolylineStyle, createArrowhead } from '../consts.tsx';

interface SequenceFlowIconProps {
  points: string;
  scale: number;
  arrowheadType?: 'standard' | 'open';
}

const SequenceFlowIcon: React.FC<SequenceFlowIconProps> = ({ points, scale = 1, arrowheadType = 'standard',
}) => {
  return (
    <svg
      style={connectingObjectSvgStyle}
      viewBox={viewBox}
    >
      <defs>
        {createArrowhead('sequenceFlow', scale, arrowheadType)}
      </defs>
      <polyline
        points={points}
        style={solidPolylineStyle(scale)}
        markerEnd={`url(#arrowhead-sequenceFlow-${arrowheadType})`}
      />
    </svg>
  );
};

export default SequenceFlowIcon;