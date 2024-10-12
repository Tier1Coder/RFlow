import React from 'react';
import { Textfit } from 'react-textfit';

interface InterruptingNoneIntermediateEventIconProps {
  name?: string;
}

const InterruptingNoneIntermediateEventIcon: React.FC<InterruptingNoneIntermediateEventIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'currentColor',
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
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

export default InterruptingNoneIntermediateEventIcon;