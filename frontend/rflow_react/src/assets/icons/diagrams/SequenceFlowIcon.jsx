import React from 'react';

const SequenceFlowIcon = ({ waypoints, strokeWidth = 2 }) => {
    if (waypoints.length < 2) return null;

    const points = waypoints.map(wp => `${wp.x},${wp.y}`).join(' ');

    return (
        <svg style={{ position: 'absolute', left: 0, top: 0 }}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="5" // Adjust the refX to position the arrowhead correctly
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
            </defs>
            <polyline
                points={points}
                style={{ fill: 'none', stroke: 'currentColor', strokeWidth }}
                markerEnd="url(#arrowhead)"
            />
        </svg>
    );
};

export default SequenceFlowIcon;
