import React from 'react';
import { Textfit } from 'react-textfit';

interface AbstractTaskIconProps {
  name?: string;
}

const AbstractTaskIcon: React.FC<AbstractTaskIconProps> = ({ name = '' }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="100"
      height="80"
      rx="10"
      ry="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    
    {name && (
        <foreignObject x="0" y="0" width="100%" height="100%">
          <div
            style={{
              position: 'absolute',
              top: '30%',
              width: '85%',
              height: '60%',
              left: '5%',
              right: '5%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Textfit
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {name}
            </Textfit>
          </div>
        </foreignObject>
    )}
  </svg>
);

export default AbstractTaskIcon;
