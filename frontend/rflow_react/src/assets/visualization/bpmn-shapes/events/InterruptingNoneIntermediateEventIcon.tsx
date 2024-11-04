import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface InterruptingNoneIntermediateEventIconProps {
  name?: string;
}

const InterruptingNoneIntermediateEventIcon: React.FC<InterruptingNoneIntermediateEventIconProps> = ({ name='' }) => (
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

      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 2px)',
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

export default InterruptingNoneIntermediateEventIcon;