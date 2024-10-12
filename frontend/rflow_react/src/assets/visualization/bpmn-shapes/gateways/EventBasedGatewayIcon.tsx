import * as React from 'react';
import { Textfit } from 'react-textfit';

interface EventBasedGatewayIconProps {
  name?: string;
}

const EventBasedGatewayIcon: React.FC<EventBasedGatewayIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="50,5 95,50 50,95 5,50"
        stroke="black"
        strokeWidth="6"
        fill="white"
      />
      <circle
        cx="50"
        cy="50"
        r="25"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="21"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      <polygon
        points="50,35 67,47 60,63 40,63 33,47"
        stroke="black"
        strokeWidth="4"
        fill="white"
      />
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

export default EventBasedGatewayIcon;