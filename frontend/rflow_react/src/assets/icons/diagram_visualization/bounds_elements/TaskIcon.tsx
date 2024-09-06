import * as React from 'react';

interface TaskIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const TaskIcon: React.FC<TaskIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', left: x, top: y, height: height, width: width }}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rectangular task box */}
      <rect
        x="0"
        y="0"
        width="512"
        height="512"
        rx="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
      />
    </svg>
  );
};

export default TaskIcon;
