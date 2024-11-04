import React from 'react';
import {
  viewBox,
  connectingObjectSvgStyle,
  dashedPolylineStyle,
  createArrowhead,
 emptyDotMarker,
} from '../consts.tsx';

interface MessageFlowIconProps {
  points: string;
  scale: number;
  arrowheadType?: 'standard' | 'open';
}

const MessageFlowIcon: React.FC<MessageFlowIconProps> = ({
  points,
  scale = 1,
  arrowheadType = 'open',
}) => {
  return (
    <svg style={connectingObjectSvgStyle} viewBox={viewBox}>
      <defs>
        {emptyDotMarker('message', scale)}
        {createArrowhead('message', scale, arrowheadType)}
      </defs>
      <polyline
        points={points}
        style={dashedPolylineStyle(scale, 10)}
        markerStart={`url(#emptyDot-message)`}
        markerEnd={`url(#arrowhead-message-${arrowheadType})`}
      />
    </svg>
  );
};

export default MessageFlowIcon;