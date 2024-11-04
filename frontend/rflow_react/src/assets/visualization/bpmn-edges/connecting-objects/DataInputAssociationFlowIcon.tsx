import React from 'react';
import { viewBox, connectingObjectSvgStyle, dashedPolylineStyle, createArrowhead } from '../consts.tsx';

interface DataInputAssociationFlowIconProps {
  points: string;
  scale: number;
  arrowheadType?: 'standard' | 'open';
}

const DataInputAssociationFlowIcon: React.FC<DataInputAssociationFlowIconProps> = ({ points, scale = 1, arrowheadType = 'open' }) => {
  return (
    <svg
      style={connectingObjectSvgStyle}
      viewBox={viewBox}
    >
      <defs>
        {createArrowhead('dataInput', scale, arrowheadType)}
      </defs>
      <polyline
        points={points}
        style={dashedPolylineStyle(scale, 2)}
        markerEnd={`url(#arrowhead-dataInput-${arrowheadType})`}
      />
    </svg>
  );
};

export default DataInputAssociationFlowIcon;
