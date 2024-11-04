import * as React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx'

interface NonInterruptingMessageEventSubProcessCollapsedIconProps {
  name?: string;
}

const NonInterruptingMessageEventSubProcessCollapsedIcon: React.FC<NonInterruptingMessageEventSubProcessCollapsedIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>

    {/* Envelope with circle */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0 
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      <g id="circle-and-envelope">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="3%"
          strokeDasharray="30,30"
        />
        <g fill="none" stroke="currentColor" strokeWidth="15">
          <rect x="60" y="70" width="80" height="50" />
          <polyline points="60,70 100,100 140,70" />
          <line x1="60" y1="120" x2="140" y2="120" />
        </g>
      </g>
    </svg>

    {/* Plus in a square */}
    <svg
      width="15%" 
      height="15%"
      viewBox="0 0 75 75"  
      style={{ 
        position: 'absolute', 
        bottom: '1%', 
        left: '50%', 
        transform: 'translateX(-50%)'
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="0"
        y="0"
        width="75"
        height="75"
        fill="none"
        stroke="currentColor"
        strokeWidth="15%" 
      />
      <line
        x1="37.5"
        y1="15"
        x2="37.5"
        y2="60"
        stroke="currentColor"
        strokeWidth="15%"
      />
      <line
        x1="15"
        y1="37.5"
        x2="60"
        y2="37.5"
        stroke="currentColor"
        strokeWidth="15%" 
      />
    </svg>

    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        border: '2px solid black',
        borderRadius: '5px'
      }}>
      <SvgTextFit 
        text={name}
        style={{width: '100%', height: '100%', padding: '2px'}} />
    </div>
  </div>
);

export default NonInterruptingMessageEventSubProcessCollapsedIcon;
