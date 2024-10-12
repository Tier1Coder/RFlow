import React from 'react';
import { Textfit } from 'react-textfit';

interface BoundaryCatchErrorIntermediateEventIconProps {
  name?: string;
}

const BoundaryCatchErrorIntermediateEventIcon: React.FC<BoundaryCatchErrorIntermediateEventIconProps> = ({ name }) => (
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
              d="M1022.25 99.36c-450.277-9.19-870.449 360.946-917.287 809.193c-49.497 379.097 158.63 778.958 505.847 944.173c327.865 164.75 753.014 115.136 1024.928-134.893c274.592-240.828 389.318-650.625 262.28-995.771c-116.8-340.193-443.475-599.288-804.797-620.012c-23.612-1.742-47.291-2.71-70.97-2.71zm-10.482 99.762c412.892-15.548 800.952 328.747 833.307 741.03c39.736 363.608-189.04 740.296-537.189 860.124c-338.432 125.14-753.857 3.483-958.257-297.534c-209.788-293.858-201.456-727.62 36.58-1003.309c152.352-183.51 386.115-299.42 625.559-300.31zm16.396 89.922c-381.953-12.152-733.35 323.184-740.25 705.155c-16.837 345.166 238.98 683.897 580.72 749.641c316.644 69.314 670.444-93.357 811.717-387.882c146.108-287.647 80.764-670.44-168.525-880.558c-132.09-117.003-306.805-186.162-483.662-186.356zm-4.494 98.05c336.708-8.902 643.367 294.109 637.967 631.148c5.952 311.573-244.82 607.695-557.658 639.11c-293.716 38.566-603.396-149.773-687.84-437.11c-88.514-273.762 27.778-603.496 282.866-744.455c97.803-57.616 211.099-88.877 324.665-88.693zm354.86 242.753c-70.08 142.052-140.158 284.114-210.237 426.167L906.887 716.005L669.47 1418.17l266.172-342.128c91.52 104.716 183.041 209.44 274.562 314.166l168.325-760.361zM930.133 854.7c82.853 105.035 165.706 210.08 248.559 315.115c20.692-46.064 41.385-92.119 62.078-138.183l-59.432 239.115c-84.565-99.48-169.13-198.972-253.695-298.453c-34.309 53.04-68.617 106.08-102.926 159.13c35.139-92.245 70.277-184.49 105.416-276.724z"
            />
          </g>
        </svg>
      </foreignObject>
    </svg>

    {name && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'currentColor',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'inherit',
          lineHeight: 1.2,
        }}
      >
        <Textfit>
          {name}
        </Textfit>
      </div>
    )}
  </div>
);

export default BoundaryCatchErrorIntermediateEventIcon;