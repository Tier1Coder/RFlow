import * as React from 'react';

interface ExclusiveGatewayIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const ExclusiveGatewayIcon: React.FC<ExclusiveGatewayIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      x={x} // Respect the x position
      y={y} // Respect the y position
      width={width} // Control the width dynamically
      height={height} // Control the height dynamically
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet" // Keep proportions and center the content
    >
      {/* Diamond shape representing the gateway */}
      <rect
        x="106"
        y="106"
        width="300"
        height="300"
        rx="20"
        transform="rotate(45 256 256)"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
      />
      {/* X inside the diamond */}
      <g stroke="currentColor" strokeWidth="40" strokeLinecap="round">
        <line x1="176" y1="176" x2="336" y2="336" />
        <line x1="336" y1="176" x2="176" y2="336" />
      </g>
    </svg>
  );
};

export default ExclusiveGatewayIcon;
