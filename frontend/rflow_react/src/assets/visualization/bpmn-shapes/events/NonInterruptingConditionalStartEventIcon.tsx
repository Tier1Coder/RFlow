import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface NonInterruptingConditionalStartEventIconProps {
  name?: string;
}

const NonInterruptingConditionalStartEventIcon: React.FC<NonInterruptingConditionalStartEventIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '12',
      }}
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
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', verticalAlign: 'middle' }}
      >
        <circle
          cx="256"
          cy="256"
          r="200"
          stroke="currentColor"
          strokeDasharray="90, 90"
          strokeWidth="5%"
          fill="none"
        />
        <rect
          x="176"
          y="176"
          width="160"
          height="160"
          fill="none"
          stroke="currentColor"
          strokeWidth="5%"
        />
        <line x1="200" y1="220" x2="312" y2="220" stroke="currentColor" strokeWidth="12" />
        <line x1="200" y1="260" x2="312" y2="260" stroke="currentColor" strokeWidth="12" />
        <line x1="200" y1="300" x2="312" y2="300" stroke="currentColor" strokeWidth="12" />
      </svg>
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

export default NonInterruptingConditionalStartEventIcon;