import React from 'react';
import { SVGProps } from 'react';

export default function LaneIcon(props: SVGProps<SVGSVGElement>) {
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
                    <path
                        fill="currentColor"
                        d="M96 484v1080h1856V484zm96 989.242v-891.54l1660-.003v891.543z"
                    />
                </g>
            </svg>
        </svg>
    );
}
