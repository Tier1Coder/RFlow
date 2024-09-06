import * as React from 'react';

interface EventBasedGatewayIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const EventBasedGatewayIcon: React.FC<EventBasedGatewayIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
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
      {/* Pentagon inside the diamond */}
      <polygon
        points="256,156 316,236 286,336 226,336 196,236"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
      />
    </svg>
  );
};

export default EventBasedGatewayIcon;
