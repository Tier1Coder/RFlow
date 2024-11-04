import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface ExclusiveGatewayIconProps {
  name?: string;
}

const ExclusiveGatewayIcon: React.FC<ExclusiveGatewayIconProps> = ({ name = '' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <rect
      x="86"
      y="86"
      width="340"
      height="340"
      rx="20"
      transform="rotate(45 256 256)"
      fill="none"
      stroke="currentColor"
      strokeWidth="40"
      />
    </svg>
    <div
      style={{
        position: 'absolute',
        top: '120%',
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SvgTextFit
        text={name}
        style={{
          textAlign: 'center',
          padding: '2px',
          color: 'black',
        }}
      />
    </div>
  </div>
);

export default ExclusiveGatewayIcon;