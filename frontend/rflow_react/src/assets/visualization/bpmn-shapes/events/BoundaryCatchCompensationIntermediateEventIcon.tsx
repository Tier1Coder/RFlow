import React from 'react';
import SvgTextFit from '../../SvgTextFit.tsx';

interface BoundaryCatchCompensationIntermediateEventIconProps {
  name?: string;
}

const BoundaryCatchCompensationIntermediateEventIcon: React.FC<BoundaryCatchCompensationIntermediateEventIconProps> = ({ name='' }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 512 512"
      style={{ color: 'currentColor' }}
      xmlns="http://www.w3.org/2000/svg"
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
      <foreignObject x="0" y="0" width="512" height="512">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 2048 2048"
          fill="currentColor"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <g fill="currentColor">
            <path
              fill="currentColor"
              d="M1022.25 99.36c-450.277-9.19-870.449 360.946-917.287 809.193c-49.497 379.097 158.63 778.958 505.847 944.173c327.865 164.75 753.014 115.136 1024.928-134.893c274.592-240.828 389.318-650.625 262.28-995.771c-116.8-340.193-443.475-599.288-804.797-620.012c-23.612-1.742-47.291-2.71-70.97-2.71zm-10.482 99.762c412.892-15.548 800.952 328.747 833.307 741.03c39.736 363.608-189.04 740.296-537.189 860.124c-338.432 125.14-753.857 3.483-958.257-297.534c-209.788-293.858-201.456-727.62 36.58-1003.309c152.352-183.51 386.115-299.42 625.559-300.31zm16.396 89.922c-381.953-12.152-733.35 323.184-740.25 705.155c-16.837 345.166 238.98 683.897 580.72 749.641c316.644 69.314 670.444-93.357 811.717-387.882c146.108-287.647 80.764-670.44-168.525-880.558c-132.09-117.003-306.805-186.162-483.662-186.356zm-4.494 98.05c336.708-8.902 643.367 294.109 637.967 631.148c5.952 311.573-244.82 607.695-557.658 639.11c-293.716 38.566-603.396-149.773-687.84-437.11c-88.514-273.762 27.778-603.496 282.866-744.455c97.803-57.616 211.099-88.877 324.665-88.693zM991.276 721.18c-142.925 100.904-285.85 201.817-428.774 302.73c142.936 100.952 285.847 201.943 428.774 302.924V1034.12c138.017 97.653 276.157 195.131 414.222 292.716V721.181l-414.222 292.523V721.181zm-50.079 96.366v412.332a5612073.011 5612073.011 0 0 1-292.148-206.161l292.148-206.17zm414.415 0v412.719c-97.383-68.782-194.766-137.573-292.149-206.355c97.383-68.79 194.766-137.572 292.149-206.364z"
            />
          </g>
        </svg>
      </foreignObject>
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

export default BoundaryCatchCompensationIntermediateEventIcon;