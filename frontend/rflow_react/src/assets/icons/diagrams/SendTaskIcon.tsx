import React from 'react';
import { SVGProps } from 'react';

export default function SendTaskIcon(props: SVGProps<SVGSVGElement>) {
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
                    <g stroke="currentColor" transform="translate(0 947.638)">
                        <rect
                            width="1800"
                            height="1460"
                            x="100"
                            y="-677.638"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeWidth="120"
                            rx="329.651"
                            ry="328.5"
                        />
                        <g fill="currentColor" fillRule="evenodd" strokeWidth=".623">
                            <path d="M346.858-428.042h999.853l-499.927 283z" />
                            <path d="m348.104-323.32 498.68 279.261 501.174-279.26V235.2H348.104z" />
                        </g>
                    </g>
                </g>
            </svg>
        </svg>
    );
}
