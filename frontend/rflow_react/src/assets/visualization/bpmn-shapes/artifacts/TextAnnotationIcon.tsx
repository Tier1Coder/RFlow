import React from 'react';
import { Textfit } from 'react-textfit';

interface TextAnnotationIconProps {
  text?: string;
}

const TextAnnotationIcon: React.FC<TextAnnotationIconProps> = ({ text }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        viewBox="0 0 256 512"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="2"
          y1="2"
          x2="2"
          y2="510"
          stroke="currentColor"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="2"
          y1="2"
          x2="254"
          y2="2"
          stroke="currentColor"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="2"
          y1="510"
          x2="254"
          y2="510"
          stroke="currentColor"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {text && (
        <div
          style={{
            position: 'absolute',
            top: '5px',  
            left: '5px',
            right: '5px',
            bottom: '5px',
            color: 'currentColor',
            overflow: 'hidden',
          }}
        >
          <Textfit
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'left',
              fontFamily: 'inherit',
              lineHeight: 1.2,
            }}
          >
            {text}
          </Textfit>
        </div>
      )}
    </div>
  );
};

export default TextAnnotationIcon;
