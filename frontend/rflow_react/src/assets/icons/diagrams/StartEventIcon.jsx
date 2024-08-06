import React, { useState} from 'react';

const StartEventIcon = ({ initialWidth = 48, initialHeight = 48, initialX = 0, initialY = 0 }) => {
    const [dimensions] = useState({
        width: initialWidth,
        height: initialHeight,
        x: initialX,
        y: initialY,
        strokeWidth: 30,
    });

    return (
        <svg
            width={dimensions.width}
            height={dimensions.height}
            viewBox="0 0 2048 2048"
            style={{ color: 'currentColor', background: 'transparent' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="currentColor">
                <path fill="none" stroke="currentColor" strokeWidth={dimensions.strokeWidth} d="M1899 1023.999c0-483.252-391.75-874.995-875-874.995S149 540.747 149 1024c0 483.251 391.75 875.004 875 875.004s875-391.753 875-875.004z" />
            </g>
        </svg>
    );
};

export default StartEventIcon;
