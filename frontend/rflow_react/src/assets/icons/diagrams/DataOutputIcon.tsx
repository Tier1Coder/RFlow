import React from 'react';
import { SVGProps } from 'react';

export default function DataOutputIcon(props: SVGProps<SVGSVGElement>) {
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
                viewBox="0 0 2000 2000"
                fill="currentColor"
                x="128"
                y="128"
                role="img"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="currentColor">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="90"
                        d="M438.243 252.897h794.702l328.812 337.647v1156.564H438.243V252.897h754.486v371.647h369.028"
                    />
                    <path
                        fill="currentColor"
                        d="M789.963 367.952v185.303H577.928V712.8h212.035v185.305l282.15-265.078z"
                    />
                </g>
            </svg>
        </svg>
    );
}
