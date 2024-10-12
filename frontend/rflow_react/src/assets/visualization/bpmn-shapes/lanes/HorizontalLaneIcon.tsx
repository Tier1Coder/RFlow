import React from 'react';
import { Textfit } from 'react-textfit';

interface HorizontalLaneIconProps {
  name?: string;
}

const HorizontalLaneIcon: React.FC<HorizontalLaneIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 20"
      style={{ color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <rect
        width="100"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    <div
      style={{
        position: 'absolute',
        top: '5%',
        left: '0.5%',
        width: '3%',
        height: '90%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
      }}
    >
      {name && (
        <Textfit
          mode="single"
          forceSingleModeWidth={false}
          min={1} 
          max={1000} 
          style={{
            width: '100%',
            height: '100%',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            textAlign: 'center',
            overflow: 'hidden',
            lineHeight: 1.2,
          }}
        >
          {name}
        </Textfit>
      )}
    </div>
  </div>
);

export default HorizontalLaneIcon;
