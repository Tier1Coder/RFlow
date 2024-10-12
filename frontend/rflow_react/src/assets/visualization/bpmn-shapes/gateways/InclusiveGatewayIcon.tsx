import React from 'react';
import { Textfit } from 'react-textfit';

interface InclusiveGatewayIconProps {
  name?: string;
}

const InclusiveGatewayIcon: React.FC<InclusiveGatewayIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
          viewBox="0 0 2048 2048"
          fill="currentColor"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <g fill="currentColor">
            <path
              fill="currentColor"
              d="M1024.022 99.36c-19.324-.017-38.646 7.15-52.98 21.55L120.937 971.023c-28.67 28.668-28.537 77.295.132 105.963l849.971 849.965c28.67 28.678 77.294 28.804 105.963 0l850.106-850.1c28.669-28.667 28.536-77.296-.135-105.964L1077.002 120.91c-14.334-14.334-33.657-21.534-52.98-21.55zm-.065 126.045l798.66 798.666l-798.66 798.657l-798.66-798.657l798.66-798.666zm.043 368.6c-237.232 0-430 192.78-430 430.008c0 237.228 192.768 430 430 430s430-192.772 430-430c0-237.229-192.768-430.008-430-430.008zm0 47.69c211.408 0 382.323 170.912 382.323 382.318c0 211.405-170.915 382.33-382.323 382.33c-211.407 0-382.322-170.925-382.322-382.33c0-211.406 170.915-382.319 382.322-382.319z"
            />
          </g>
        </svg>
      </foreignObject>
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

export default InclusiveGatewayIcon;