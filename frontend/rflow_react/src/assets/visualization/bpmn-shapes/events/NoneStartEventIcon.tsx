import React from 'react';
import { Textfit } from 'react-textfit';

interface NoneStartEventIconProps {
  name?: string;
}

const NoneStartEventIcon: React.FC<NoneStartEventIconProps> = ({ name }) => (
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
        <Textfit mode="single" min={10}>
          {name}
        </Textfit>
      </div>
    )}
  </div>
);

export default NoneStartEventIcon;