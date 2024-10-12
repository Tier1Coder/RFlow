import React from 'react';
import { Textfit } from 'react-textfit';

interface ExclusiveGatewayWithMarkerIconProps {
  name?: string;
}

const ExclusiveGatewayWithMarkerIcon: React.FC<ExclusiveGatewayWithMarkerIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
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
      <g stroke="currentColor" strokeWidth="40" strokeLinecap="round">
        <line x1="206" y1="206" x2="306" y2="306" />
        <line x1="306" y1="206" x2="206" y2="306" />
      </g>
    </svg>

    {name && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'currentColor',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'inherit',
          lineHeight: 1.2,
        }}
      >
        <Textfit>
          {name}
        </Textfit>
      </div>
    )}
  </div>
);

export default ExclusiveGatewayWithMarkerIcon;