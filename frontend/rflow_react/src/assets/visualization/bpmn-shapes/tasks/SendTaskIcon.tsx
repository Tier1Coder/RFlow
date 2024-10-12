import React from 'react';
import AbstractTaskIcon from './AbstractTaskIcon.tsx';

interface SendTaskIconProps {
  name?: string;
}

const SendTaskIcon: React.FC<SendTaskIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', top: 0, left: 0, color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <AbstractTaskIcon name={name} />
    </svg>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', top: "10%", left: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      <g fill="black" stroke="white" strokeWidth="10" transform="translate(0, 0) scale(1, 1)">
        <rect x="32" y="32" width="128" height="80" />
        <polyline points="32,32 96,72 160,32" />
        <line x1="32" y1="112" x2="160" y2="112" />
      </g>
    </svg>
  </div>
);

export default SendTaskIcon;