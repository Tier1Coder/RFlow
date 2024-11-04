import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface NoneStartEventIconProps {
  name?: string;
}

const NoneStartEventIcon: React.FC<NoneStartEventIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'currentColor',
      }}
    >
      <circle
        cx="256"
        cy="256"
        r="230"
        fill="none"
        stroke="currentColor"
        strokeWidth="7%"
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

export default NoneStartEventIcon;