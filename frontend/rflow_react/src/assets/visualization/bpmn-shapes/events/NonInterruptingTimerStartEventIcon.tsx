import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface NonInterruptingTimerStartEventIconProps {
  name?: string;
}

const NonInterruptingTimerStartEventIcon: React.FC<NonInterruptingTimerStartEventIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 512 512"
      style={{ color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
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
          fill="none"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="64">
            <circle cx="1024" cy="1024" r="960" strokeDasharray="200, 200" />
            <circle cx="1024" cy="1024" r="480" />
            <line x1="1024" y1="1024" x2="1024" y2="760" strokeWidth="40" />
            <line x1="1024" y1="1024" x2="1240" y2="1024" strokeWidth="40" />
          </g>
        </svg>
      </foreignObject>
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

export default NonInterruptingTimerStartEventIcon;