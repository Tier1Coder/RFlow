import * as React from 'react';

interface TextAnnotationIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const TextAnnotationIcon: React.FC<TextAnnotationIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width, color: 'currentColor' }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
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
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 2048 2048"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <g fill="none" stroke="currentColor">
            <path
              strokeLinecap="square"
              strokeWidth="100.849"
              d="M1894.928-831.939h-458.41V852.603h458.41"
              transform="matrix(1.00396 0 0 1.01551 -3.915 995.337)"
            />
            <path
              strokeDasharray="196.992 196.992"
              strokeWidth="196.992"
              d="m201.143 840.592l1205.186-954.18"
              transform="matrix(1.00396 0 0 1.01551 -3.915 995.337)"
            />
          </g>
        </g>
      </svg>
    </svg>
  );
};

export default TextAnnotationIcon;
