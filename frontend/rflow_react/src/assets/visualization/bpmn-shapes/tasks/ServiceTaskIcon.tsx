import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface ServiceTaskIconProps {
  name?: string;
}

const ServiceTaskIcon: React.FC<ServiceTaskIconProps> = ({
  name = ''
}) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '2px',
        boxSizing: 'border-box'
      }}>

      {/* Service Icon */}
      <div style={{ 
        position: 'absolute',
        top: '2px',
        left: '2px',
        width: 'auto',
        height: '20%', 
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          preserveAspectRatio='xMidYMid meet'
          style={{
            display: 'block',
          }}
        >
          <g
            fill="currentColor"
            stroke="none"
          >
            <path d="M44.575,55.581l-16.411,-16.436c0,0 -8.462,2.97 -15.352,-3.931c-7.896,-7.908 -3.505,-17.121 -3.505,-17.121c0,0 8.199,8.117 10.347,10.269c1.71,1.713 3.686,1.47 7.043,-1.892c2.54,-2.544 3.233,-5.108 1.59,-6.754c-2.288,-2.291 -10.347,-10.269 -10.347,-10.269c0,0 9.763,-4.66 17.508,3.097c6.884,6.894 4.282,15.017 4.122,15.178c-0.064,0.063 7.343,7.509 16.341,16.505l-11.336,11.354Z" />
          </g>
        </svg>
      </div>
      <SvgTextFit 
        text={name}
        style={{
          position: 'absolute',
          top: 'calc(20% + 2px)',
          left: '2px',
          right: '2px',
          bottom: '2px',
          padding: '2px',
          boxSizing: 'border-box'
        }} 
      />
    </div>
  );
};

export default ServiceTaskIcon;