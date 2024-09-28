import React from 'react';

const ScriptTaskIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: 'currentColor' }}
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
        viewBox="0 0 512 512"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <rect
          x="0"
          y="0"
          width="512"
          height="512"
          rx="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="40"
        />
        <g fill="none" stroke="currentColor" strokeWidth="20">
          <rect x="128" y="128" width="256" height="256" rx="10" ry="10" />
          <polyline points="384,128 320,128 384,192" />
          <line x1="160" y1="200" x2="352" y2="200" />
          <line x1="160" y1="260" x2="352" y2="260" />
          <line x1="160" y1="320" x2="352" y2="320" />
        </g>
      </svg>
    </foreignObject>
  </svg>
);

export default ScriptTaskIcon;