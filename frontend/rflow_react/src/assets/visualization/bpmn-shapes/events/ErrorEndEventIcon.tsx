import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface ErrorEndEventIconProps {
  name?: string;
}

const ErrorEndEventIcon: React.FC<ErrorEndEventIconProps> = ({ name='' }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 2048 2048"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '12',
        }}
      >
        <rect
          width="2048"
          height="2048"
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
            fill="currentColor"
            d="M1005.303 98.988c-447.59.377-859.063 373.342-901.291 819.483c-45.314 379.987 168.535 777.154 517.567 938.558c324.137 158.423 740.176 108.288 1009.01-135.647c273.526-236.69 393.041-640.13 272.893-984.32c-114.258-351.15-451.46-619.981-822.842-636.252c-25.079-1.64-50.213-1.947-75.337-1.822zm18.334 289.733c329.628-9.588 631.825 281.137 635.693 610.898c14.255 301.673-212.385 597.907-513.018 648.484c-290.913 58.275-613.563-109.854-715.39-392.282c-109.622-279.29 2.217-632.478 269.045-779.065c97.56-57.284 210.508-88.176 323.67-88.035zm354.892 241.117l-210.236 426.178L906.887 716L669.47 1418.162l266.174-342.127l274.562 314.172l168.322-760.37z"
          />
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 2px)',
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SvgTextFit
          text={name}
          style={{
            textAlign: 'center',
            padding: '2px',
            color: 'black',
          }}
        />
      </div>
    </div>
  );
};

export default ErrorEndEventIcon;