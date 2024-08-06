import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartEventIcon from '../assets/icons/diagrams/StartEventIcon';
import EndEventIcon from '../assets/icons/diagrams/EndEventIcon';
import SequenceFlowIcon from '../assets/icons/diagrams/SequenceFlowIcon';
import ScriptTaskIcon from '../assets/icons/diagrams/ScriptTaskIcon';
import UserTaskIcon from '../assets/icons/diagrams/UserTaskIcon';
import ParallelGatewayIcon from '../assets/icons/diagrams/ParallelGatewayIcon';
import ParticipantIcon from '../assets/icons/diagrams/ParticipantIcon';

const DiagramRenderer = () => {
    const location = useLocation();
    const diagramData = location.state?.diagramData?.xml_content;
    const diagramName = location.state?.diagramName;

    useEffect(() => {
        console.log(diagramData); // Debug
    }, [diagramData]);

    const calculateViewBox = () => {
        if (!diagramData) return '0 0 100 100';

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        Object.entries(diagramData).forEach(([key, element]) => {
            if (element.Bounds) {
                const { x, y, width, height } = element.Bounds;
                const numericX = parseFloat(x);
                const numericY = parseFloat(y);
                const numericWidth = parseFloat(width);
                const numericHeight = parseFloat(height);

                if (!isNaN(numericX) && !isNaN(numericY) && !isNaN(numericWidth) && !isNaN(numericHeight)) {
                    minX = Math.min(minX, numericX);
                    minY = Math.min(minY, numericY);
                    maxX = Math.max(maxX, numericX + numericWidth);
                    maxY = Math.max(maxY, numericY + numericHeight);
                }
            }

            if (element.elementType === 'sequenceFlow') {
                const waypoints = Object.keys(element)
                    .filter(key => key.startsWith('waypoint'))
                    .map(key => element[key]);

                waypoints.forEach(wp => {
                    const numericX = parseFloat(wp.x);
                    const numericY = parseFloat(wp.y);

                    if (!isNaN(numericX) && !isNaN(numericY)) {
                        minX = Math.min(minX, numericX);
                        minY = Math.min(minY, numericY);
                        maxX = Math.max(maxX, numericX);
                        maxY = Math.max(maxY, numericY);
                    }
                });
            }
        });

        if (minX === Infinity || minY === Infinity || maxX === -Infinity || maxY === -Infinity) {
            return '0 0 100 100';
        }

        const padding = 100;
        return `${minX - padding} ${minY - padding} ${maxX - minX + 2 * padding} ${maxY - minY + 2 * padding}`;
    };

    const renderElement = (element, key) => {
        const { x, y, width, height } = element.Bounds || {};
        const numericX = parseFloat(x);
        const numericY = parseFloat(y);
        const numericWidth = parseFloat(width);
        const numericHeight = parseFloat(height);

        const iconProps = { initialWidth: numericWidth, initialHeight: numericHeight };

        const transform = `matrix(1, 0, 0, 1, ${numericX}, ${numericY})`;

        switch (element.elementType) {
            case 'startEvent':
                return (
                    <g key={key} transform={transform}>
                        <StartEventIcon {...iconProps} />
                    </g>
                );
            case 'endEvent':
                return (
                    <g key={key} transform={transform}>
                        <EndEventIcon {...iconProps} />
                    </g>
                );
            case 'scriptTask':
                return (
                    <g key={key} transform={transform}>
                        <ScriptTaskIcon {...iconProps} />
                    </g>
                );
            case 'userTask':
                return (
                    <g key={key} transform={transform}>
                        <UserTaskIcon {...iconProps} />
                    </g>
                );
            case 'parallelGateway':
                return (
                    <g key={key} transform={transform}>
                        <ParallelGatewayIcon {...iconProps} />
                    </g>
                );
            case 'participant':
                return (
                    <g key={key} transform={transform}>
                        <ParticipantIcon {...iconProps} />
                    </g>
                );
            case 'sequenceFlow':
                const waypoints = Object.keys(element)
                    .filter(key => key.startsWith('waypoint'))
                    .map(key => element[key]);
                return <SequenceFlowIcon key={key} waypoints={waypoints} strokeWidth={2} />;
            default:
                console.log('Unrecognized element: ', {element});
                return null;
        }
    };

    if (!diagramData) {
        return <div>No diagram data available</div>;
    }

    return (
        <div>
            <h2>Visualization of: {diagramName}</h2>
            <svg style={{ width: 'auto', height: 'auto' }} viewBox={calculateViewBox()}>
                <g id="workspace">
                    {Object.entries(diagramData).map(([key, element]) => renderElement(element, key))}
                </g>
            </svg>
            <div>
                <pre>{JSON.stringify(diagramData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default DiagramRenderer;
