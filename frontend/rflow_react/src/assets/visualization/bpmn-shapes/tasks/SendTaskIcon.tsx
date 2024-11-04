import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx'

interface ReceiveTaskIconProps {
  name?: string;
}

const ReceiveTaskIcon: React.FC<ReceiveTaskIconProps> = ({
  name = ''
}) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '2px',
        boxSizing: 'border-box'
      }}>

      {/* Envelope Icon */}
      <div style={{ 
        position: 'absolute',
        top: '2px',
        left: '2px',
        width: 'auto',
        height: '20%', 
      }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24" 
          preserveAspectRatio='xMidYMid meet'
          style={{
            display: 'block',
          }}
        >
          <g
            fill="black"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </g>
        </svg>
      </div>
      <SvgTextFit 
        text={name}
        style={{
          position: 'absolute',
          top: 'calc(20% + 2px)',
          left: '2px',
          right: '2px',
          bottom: '2px',
          padding: '2px',
          boxSizing: 'border-box'
        }} 
      />
    </div>
  );
};

export default ReceiveTaskIcon;
