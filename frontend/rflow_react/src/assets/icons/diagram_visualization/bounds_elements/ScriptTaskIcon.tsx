import * as React from 'react';

interface ScriptTaskIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const ScriptTaskIcon: React.FC<ScriptTaskIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rectangular task box */}
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
      {/* Script icon inside the task box */}
      <g fill="none" stroke="currentColor" strokeWidth="20">
        {/* Script icon - representing a document */}
        <rect x="128" y="128" width="256" height="256" rx="10" ry="10" />
        {/* Folded corner of the script icon */}
        <polyline points="384,128 320,128 384,192" />
        {/* Script lines */}
        <line x1="160" y1="200" x2="352" y2="200" />
        <line x1="160" y1="260" x2="352" y2="260" />
        <line x1="160" y1="320" x2="352" y2="320" />
      </g>
    </svg>
  );
};

export default ScriptTaskIcon;
