import * as React from 'react';

function ParticipantIcon(props: React.SVGProps<SVGSVGElement>) {
    const { width, height } = props;

    return (
        <svg
            width={width || "40"}
            height={height || "40"}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
            />
            <rect
                x="0"
                y="0"
                width="30"
                height={height}
                fill="#e8e8e8"
                stroke="#000000"
                strokeWidth="2"
            />
        </svg>
    );
};

export default ParticipantIcon;
