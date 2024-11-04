import React from 'react';

export const connectingObjectSvgStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'visible',
    height: 1,
    width: 1,
  };

export const viewBox = '0 0 1 1';
  
export const dashedPolylineStyle = (scale: number, dashMultiplicator: number): React.CSSProperties => ({
// The greater the dashMultiplicator, the more spaced the dashes will be
fill: 'none',
stroke: 'currentColor',
strokeWidth: scale,
strokeDasharray: `${dashMultiplicator * scale}, ${dashMultiplicator * scale}`,
});

export const solidPolylineStyle = (scale: number): React.CSSProperties => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: scale,
});

export const createArrowhead = (id: string, scale: number, type: 'standard' | 'open' = 'standard') => {
  switch (type) {
    case 'open':
      return (
        <marker
          id={`arrowhead-${id}-open`}
          markerWidth={6 * scale}
          markerHeight={6 * scale}
          refX={6 * scale}
          refY={3 * scale}
          orient="auto"
        >
          <polygon points={`0,0 ${6 * scale},${3 * scale} 0,${6 * scale}`} fill="none" stroke="currentColor" strokeWidth={1 * scale} />
        </marker>
      );
    default:
      return (
        <marker
          id={`arrowhead-${id}-standard`}
          markerWidth={6 * scale}
          markerHeight={6 * scale}
          refX={6 * scale}
          refY={3 * scale}
          orient="auto"
        >
          <polygon points={`0,0 ${6 * scale},${3 * scale} 0,${6 * scale}`} fill="currentColor" />
        </marker>
      );
  }
};

export const emptyDotMarker = (
  id: string,
  scale: number
) => (
  <marker
    id={`emptyDot-${id}`}
    markerWidth={scale * 8}
    markerHeight={scale * 8}
    refX={scale * 4}
    refY={scale * 4}
    orient="auto"
  >
    <circle
      cx={scale * 4}
      cy={scale * 4}
      r={scale * 2}
      fill="none"
      stroke="currentColor"
      strokeWidth={scale}
    />
  </marker>
);
