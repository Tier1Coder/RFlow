import * as React from 'react';

interface SendTaskIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const SendTaskIcon: React.FC<SendTaskIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rectangular task box */}
      <rect
        x="0"
        y="0"
        width="512"
        height="512"
        rx="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
      />
      {/* Envelope icon inside the task box */}
      <g fill="none" stroke="currentColor" strokeWidth="20">
        {/* Envelope outline */}
        <rect x="128" y="176" width="256" height="160" />
        {/* Envelope flap (triangle) */}
        <polyline points="128,176 256,256 384,176" />
        {/* Horizontal line for the envelope bottom */}
        <line x1="128" y1="336" x2="384" y2="336" />
      </g>
    </svg>
  );
};

export default SendTaskIcon;
