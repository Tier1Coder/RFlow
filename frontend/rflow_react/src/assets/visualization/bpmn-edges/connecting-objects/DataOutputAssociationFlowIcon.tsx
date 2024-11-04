import React from 'react';
import { viewBox, connectingObjectSvgStyle, dashedPolylineStyle, createArrowhead } from '../consts.tsx';

interface DataOutputAssociationFlowIconProps {
  points: string;
  scale: number;
  arrowheadType?: 'standard' | 'open';
}

const DataOutputAssociationFlowIcon: React.FC<DataOutputAssociationFlowIconProps> = ({ points, scale = 1, arrowheadType = 'open'}) => {
  return (
    <svg style={connectingObjectSvgStyle} viewBox={viewBox}>
      <defs>
        {createArrowhead('dataOutput', scale, arrowheadType)}
      </defs>
      <polyline
        points={points}
        style={dashedPolylineStyle(scale, 2)}
        markerEnd={`url(#arrowhead-dataOutput-${arrowheadType})`}
      />
    </svg>
  );
};

export default DataOutputAssociationFlowIcon;