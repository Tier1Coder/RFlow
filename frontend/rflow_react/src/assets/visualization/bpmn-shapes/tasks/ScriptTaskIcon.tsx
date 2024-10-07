import React from 'react';
import AbstractTaskIcon from './AbstractTaskIcon.tsx';

const ScriptTaskIcon: React.FC = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    {/* Outer SVG */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', top: 0, left: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <AbstractTaskIcon />
    </svg>

    {/* Inner SVG for <g> group */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', top: 0, left: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
    >
      <g fill="none" stroke="currentColor" strokeWidth="20" transform="translate(0, 0) scale(0.5, 0.5)">
        <rect x="128" y="128" width="256" height="256" rx="10" ry="10" />
        <polyline points="384,128 320,128 384,192" />
        <line x1="160" y1="200" x2="352" y2="200" />
        <line x1="160" y1="260" x2="352" y2="260" />
        <line x1="160" y1="320" x2="352" y2="320" />
      </g>
    </svg>
  </div>
);

export default ScriptTaskIcon;