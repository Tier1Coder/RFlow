import * as React from 'react';

interface DataInputIconProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DataInputIcon: React.FC<DataInputIconProps> = ({ x, y, width, height }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, width: width, height: height }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer rectangular container */}
      <rect
        width="512"
        height="512"
        rx="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
      />
      {/* Arrow representing data input */}
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="40">
        {/* Arrow for input */}
        <path d="M200 220v60h-100v60h100v60l70-90z" />
        {/* Box representing input area */}
        <rect x="250" y="180" width="200" height="200" />
      </g>
    </svg>
  );
};

export default DataInputIcon;
