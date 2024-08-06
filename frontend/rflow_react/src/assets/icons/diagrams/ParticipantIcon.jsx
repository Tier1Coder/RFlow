import React from 'react';

const ParticipantIcon = ({ width, height, x, y }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ color: 'currentColor', background: 'transparent', position: 'absolute', left: x, top: y}}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <path
                    fill="currentColor"
                    d="M96 402v1280h1856V402zm1756 97.7v1091.542H480V499.702l1372-.003zm-1660 0h192v1091.541H192z"
                />
            </g>
        </svg>
    );
};

export default ParticipantIcon;
