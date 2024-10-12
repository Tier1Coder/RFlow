import * as React from 'react';
import { Textfit } from 'react-textfit';

interface DataOutputIconProps {
  name?: string;
}

const DataOutputIcon: React.FC<DataOutputIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'currentColor',
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect
        width="512"
        height="512"
        x="0"
        y="0"
        rx="7.5"
        fill="transparent"
        stroke="transparent"
        strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      />
      <g fill="currentColor">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4.5%"
          d="M112.5 63.224h198.676l82.203 84.412v289.141H112.5V63.224h188.621v92.912h92.257"
        />
        <path
          fill="currentColor"
          d="M197.491 91.988v46.326H144.482v46.326h53.009v46.326l70.537-66.27z"
        />
      </g>
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

export default DataOutputIcon;