import { useState, useEffect } from 'react';

/**
 * Custom hook to calculate scaled diagram data based on container size.
 * 
 * @param {Object} diagramData - The diagram data to scale.
 * @param {Object} containerRef - The ref of the container element.
 * @returns {Object} - { scaledDiagramData, scale }
 */
const useScaleDiagram = (diagramData, containerRef) => {
    const [scaledDiagramData, setScaledDiagramData] = useState(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!diagramData || !containerRef.current) {
            return;
        }

        const calculateScaledDiagramData = () => {
            const outerDiv = containerRef.current;
            const outerDivWidth = outerDiv.clientWidth;
            const outerDivHeight = outerDiv.clientHeight;

            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            Object.values(diagramData).forEach((element) => {
                const { Bounds } = element;
                if (Bounds) {
                    const { x: xStr, y: yStr, width: widthStr, height: heightStr } = Bounds;
                    const x = parseFloat(xStr);
                    const y = parseFloat(yStr);
                    const width = parseFloat(widthStr);
                    const height = parseFloat(heightStr);
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x + width);
                    maxY = Math.max(maxY, y + height);
                } else if (element.waypoint1 && element.waypoint2) {
                    const waypoints = Object.keys(element)
                        .filter(key => key.startsWith('waypoint'))
                        .map(key => element[key]);

                    waypoints.forEach(({ x: xStr, y: yStr }) => {
                        const x = parseFloat(xStr);
                        const y = parseFloat(yStr);
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    });
                }
            });

            const diagramWidth = maxX - minX;
            const diagramHeight = maxY - minY;

            const scaleX = outerDivWidth / diagramWidth;
            const scaleY = outerDivHeight / diagramHeight;
            const calculatedScale = Math.min(scaleX, scaleY);
            setScale(calculatedScale);

            const newScaledDiagramData = {};

            Object.entries(diagramData).forEach(([key, element]) => {
                const scaledElement = { ...element };

                if (element.Bounds) {
                    const { x: xStr, y: yStr, width: widthStr, height: heightStr } = element.Bounds;
                    const x = parseFloat(xStr);
                    const y = parseFloat(yStr);
                    const width = parseFloat(widthStr);
                    const height = parseFloat(heightStr);
                    scaledElement.Bounds = {
                        x: (x - minX) * calculatedScale,
                        y: (y - minY) * calculatedScale,
                        width: width * calculatedScale,
                        height: height * calculatedScale
                    };
                } else if (element.waypoint1 && element.waypoint2) {
                    const waypoints = Object.keys(element)
                        .filter(key => key.startsWith('waypoint'))
                        .reduce((acc, waypointKey) => {
                            const { x: xStr, y: yStr } = element[waypointKey];
                            const x = parseFloat(xStr);
                            const y = parseFloat(yStr);
                            acc[waypointKey] = {
                                x: (x - minX) * calculatedScale,
                                y: (y - minY) * calculatedScale
                            };
                            return acc;
                        }, {});
                    Object.assign(scaledElement, waypoints);
                }

                newScaledDiagramData[key] = scaledElement;
            });
            setScaledDiagramData(newScaledDiagramData);
        };

        calculateScaledDiagramData();

        const handleResize = () => {
            calculateScaledDiagramData();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [diagramData, containerRef]);

    return { scaledDiagramData, scale };
};

export default useScaleDiagram;
