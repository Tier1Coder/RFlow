import React from 'react';
import { Textfit } from 'react-textfit';

interface MessageEndEventIconProps {
  name?: string;
}

const MessageEndEventIcon: React.FC<MessageEndEventIconProps> = ({ name }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 512 512"
      style={{ color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
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
      <circle
        cx="256"
        cy="256"
        r="200"
        stroke="currentColor"
        strokeWidth="60"
        fill="none"
      />
      <foreignObject x="96" y="96" width="320" height="320">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1800 1800"
          fill="currentColor"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <g fill="black" stroke="white" strokeWidth="10">
            <rect
              width="1200"
              height="900"
              x="300"
              y="450"
              fill="black"
              stroke="white"
              strokeWidth="100"
              rx="50"
              ry="50"
            />
            <polyline
              points="300,450 900,850 1500,450"
              stroke="white"
              strokeWidth="100"
              fill="none"
            />
          </g>
        </svg>
      </foreignObject>
    </svg>

    {name && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'currentColor',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'inherit',
          lineHeight: 1.2,
        }}
      >
        <Textfit>
          {name}
        </Textfit>
      </div>
    )}
  </div>
);

export default MessageEndEventIcon;