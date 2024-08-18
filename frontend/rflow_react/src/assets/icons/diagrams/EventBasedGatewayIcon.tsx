import React from 'react';
import { SVGProps } from 'react';

export default function EventBasedGatewayIcon(props: SVGProps<SVGSVGElement>) {
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
                        d="M1024.022 99.36c-19.324-.017-38.646 7.15-52.98 21.55L120.937 971.023c-28.67 28.668-28.537 77.295.132 105.963l849.971 849.965c28.67 28.678 77.294 28.804 105.963 0l850.106-850.1c28.669-28.667 28.536-77.296-.135-105.964L1077.002 120.91c-14.334-14.334-33.657-21.534-52.98-21.55zm-.065 126.045l798.66 798.666-798.66 798.657-798.66-798.657 798.66-798.666zm.045 339.555l-14.703 10.672-426.28 309.453 168.44 517.967h545.082l168.44-517.967-440.979-320.125zm-.004 61.775l382.178 277.44-145.977 448.904H787.801L641.824 904.175l382.174-277.44z"
                    />
                </g>
            </svg>
        </svg>
    );
}
