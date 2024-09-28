import React from 'react';

const ReceiveTaskIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    viewBox="0 0 512 512"
    style={{ color: 'currentColor' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="512"
      height="512"
      x="0"
      y="0"
      rx="30"
      fill="transparent"
      stroke="transparent"
      strokeWidth="0"
      strokeOpacity="100%"
      paintOrder="stroke"
    />
    <foreignObject x="0" y="0" width="512" height="512">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <rect
          x="0"
          y="0"
          width="512"
          height="512"
          rx="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
        />
        <g fill="white" stroke="black" strokeWidth="10">
          <rect x="32" y="32" width="128" height="80" />
          <polyline points="32,32 96,72 160,32" />
          <line x1="32" y1="112" x2="160" y2="112" />
        </g>
      </svg>
    </foreignObject>
  </svg>
);

export default ReceiveTaskIcon;