import React from 'react';

interface LaneIconProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const LaneIcon: React.FC<LaneIconProps> = ({ x, y, width, height }) => {
  return (
    <svg
      style={{ position: 'absolute',  overflow: 'visible', left: x, top: y, height: height, width: width}}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default LaneIcon;
