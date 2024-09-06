import * as React from 'react';

interface DataOutputIconProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DataOutputIcon: React.FC<DataOutputIconProps> = ({ x, y, width, height }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, width: width, height: height }}
      viewBox="0 0 2000 2000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width={width}
        height={height}
        x="0"
        y="0"
        rx="30"
        fill="transparent"
        stroke="transparent"
        strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      />
      <g fill="currentColor">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="90"
          d="M438.243 252.897h794.702l328.812 337.647v1156.564H438.243V252.897h754.486v371.647h369.028"
        />
        <path
          fill="currentColor"
          d="M789.963 367.952v185.303H577.928V712.8h212.035v185.305l282.15-265.078z"
        />
      </g>
    </svg>
  );
};

export default DataOutputIcon;
