import React from 'react';

const HorizontalPoolIcon: React.FC = () => (
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
      width="100%"
      height="99%"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="0.5%"
    />
    <rect
      width="2%"
      height="99%"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="0.5%"
    />
  </svg>
);

export default HorizontalPoolIcon;
