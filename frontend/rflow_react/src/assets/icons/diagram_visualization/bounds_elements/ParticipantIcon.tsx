import * as React from 'react';

interface ParticipantIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const ParticipantIcon: React.FC<ParticipantIconProps> = ({ x = 0, y = 0, width = 512, height = 200 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, width: width, height: height }}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer container */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Left shaded part */}
      <rect
        x="0"
        y="0"
        width="30" // Fixed width for the left shaded part
        height={height}
        fill="#e8e8e8"
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ParticipantIcon;
