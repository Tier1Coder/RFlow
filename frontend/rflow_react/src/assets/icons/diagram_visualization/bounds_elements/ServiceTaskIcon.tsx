import * as React from 'react';

interface ServiceTaskIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const ServiceTaskIcon: React.FC<ServiceTaskIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
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
      {/* Gear icon inside the task box */}
      <g fill="none" stroke="currentColor" strokeWidth="20">
        {/* Outer gear circle */}
        <circle cx="256" cy="256" r="80" />
        {/* Gear teeth */}
        <line x1="256" y1="146" x2="256" y2="110" />
        <line x1="256" y1="366" x2="256" y2="402" />
        <line x1="366" y1="256" x2="402" y2="256" />
        <line x1="146" y1="256" x2="110" y2="256" />
        <line x1="327" y1="185" x2="355" y2="157" />
        <line x1="185" y1="327" x2="157" y2="355" />
        <line x1="327" y1="327" x2="355" y2="355" />
        <line x1="185" y1="185" x2="157" y2="157" />
      </g>
    </svg>
  );
};

export default ServiceTaskIcon;
