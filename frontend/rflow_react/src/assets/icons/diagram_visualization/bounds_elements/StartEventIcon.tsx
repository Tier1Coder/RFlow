import React from 'react';

interface StartEventIconProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const StartEventIcon: React.FC<StartEventIconProps> = ({ x, y, width, height }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width }}
      viewBox="0 0 2000 2000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
          d="M1899 1023.999c0-483.252-391.75-874.995-875-874.995S149 540.747 149 1024c0 483.251 391.75 875.004 875 875.004s875-391.753 875-875.004z"
        />
      </g>
    </svg>
  );
};

export default StartEventIcon;
