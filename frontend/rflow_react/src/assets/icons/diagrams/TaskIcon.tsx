import React from 'react';
import { SVGProps } from 'react';

export default function TaskIcon(props: SVGProps<SVGSVGElement>) {
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
          <rect
            width="17.563"
            height="14.478"
            x="1.23"
            y="1035.052"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.034"
            rx="2.759"
            transform="translate(55.328 -99820.702) scale(96.7529)"
          />
        </g>
      </svg>
    </svg>
  );
}
