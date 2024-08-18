import React from 'react';

function MessageFlowIcon({ waypoints }) {
    const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');

    return (
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <defs>
                <marker
                    id="openArrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="5"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 3.5, 5 7, 10 3.5, 5 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </marker>
            </defs>
            <polyline
                points={points}
                style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeDasharray: '6,3' }}
                markerEnd="url(#openArrowhead)"
            />
        </svg>
    );
}

export default MessageFlowIcon;
