import * as React from 'react';

const SubProcessCollapsedIcon: React.FC = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    {/* 1. Outside rectangle */}
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
      preserveAspectRatio="none"
    >
      <rect
        width="512"
        height="512"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3%"
        rx="66.7"
      />
    </svg>

    {/* 2. Plus in square */}
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
  </div>
);

export default SubProcessCollapsedIcon;