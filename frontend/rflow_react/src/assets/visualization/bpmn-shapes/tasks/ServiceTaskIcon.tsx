import React from 'react';
import AbstractTaskIcon from './AbstractTaskIcon.tsx';

interface ServiceTaskIconProps {
  name?: string;
}

const ServiceTaskIcon: React.FC<ServiceTaskIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    {/* Outer SVG */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      style={{ position: 'absolute', top: 0, left: 0, color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <AbstractTaskIcon name={name} />
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
      <g
        transform="translate(20, 20) scale(3)" 
        fill="currentColor"
        stroke="none"
      >
        <path d="M44.575,55.581l-16.411,-16.436c0,0 -8.462,2.97 -15.352,-3.931c-7.896,-7.908 -3.505,-17.121 -3.505,-17.121c0,0 8.199,8.117 10.347,10.269c1.71,1.713 3.686,1.47 7.043,-1.892c2.54,-2.544 3.233,-5.108 1.59,-6.754c-2.288,-2.291 -10.347,-10.269 -10.347,-10.269c0,0 9.763,-4.66 17.508,3.097c6.884,6.894 4.282,15.017 4.122,15.178c-0.064,0.063 7.343,7.509 16.341,16.505l-11.336,11.354Z" />
      </g>
    </svg>
  </div>
);

export default ServiceTaskIcon;