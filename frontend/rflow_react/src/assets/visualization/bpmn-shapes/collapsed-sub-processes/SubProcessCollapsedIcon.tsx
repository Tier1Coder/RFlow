import * as React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface SubProcessCollapsedIconProps {
  name?: string;
}

const SubProcessCollapsedIcon: React.FC<SubProcessCollapsedIconProps> = ({ name = '' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white', 
        zIndex: 1,
      }}
    ></div>

    {/* Plus in a square on top of the white background */}
    <svg
      width="15%"
      height="15%"
      viewBox="0 0 75 75"
      style={{
        position: 'absolute',
        bottom: '1%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3, 
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

    {/* The main content */}
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '2px solid black',
        borderRadius: '5px',
        zIndex: 2, 
      }}
    >
      <SvgTextFit
        text={name}
        style={{ 
          width: '100%', 
          height: '100%', 
          padding: '2px' 
        }}
      />
    </div>
  </div>
);

export default SubProcessCollapsedIcon;
