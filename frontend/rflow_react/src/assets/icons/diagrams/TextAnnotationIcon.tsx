import React from 'react';
import { SVGProps } from 'react';

export default function TextAnnotationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      style={{ color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      {...props}
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
}
