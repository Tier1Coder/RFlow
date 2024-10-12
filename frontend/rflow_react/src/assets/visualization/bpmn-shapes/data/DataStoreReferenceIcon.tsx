import React from 'react';
import { Textfit } from 'react-textfit';

interface DataStoreReferenceIconProps {
  name?: string;
}

const DataStoreReferenceIcon: React.FC<DataStoreReferenceIconProps> = ({ name }) => (
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
        rx="32"
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
          d="M88.776 132.641v234.718c10.745 52.159 311.721 52.159 322.466 0V132.641c-10.745-52.159-311.721-52.159-322.466 0c10.745 52.159 311.721 52.159 322.466 0M88.776 176.553c10.745 52.159 311.721 52.159 322.466 0M88.776 220.465c10.745 52.159 311.721 52.159 322.466 0"
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

export default DataStoreReferenceIcon;