import React from 'react';
import { Textfit } from 'react-textfit';

interface ParallelGatewayIconProps {
  name?: string;
}

const ParallelGatewayIcon: React.FC<ParallelGatewayIconProps> = ({ name }) => (
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
      <line x1="256" y1="156" x2="256" y2="356" stroke="currentColor" strokeWidth="40" />
      <line x1="156" y1="256" x2="356" y2="256" stroke="currentColor" strokeWidth="40" />
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

export default ParallelGatewayIcon;