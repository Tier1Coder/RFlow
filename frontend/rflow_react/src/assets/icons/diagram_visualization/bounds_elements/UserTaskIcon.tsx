import * as React from 'react';

interface UserTaskIconProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const UserTaskIcon: React.FC<UserTaskIconProps> = ({ x = 0, y = 0, width = 512, height = 512 }) => {
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
      {/* User icon inside the task box */}
      <g fill="none" stroke="currentColor" strokeWidth="20">
        {/* User's head */}
        <circle cx="256" cy="176" r="50" />
        {/* User's body */}
        <path d="M206 260 C206 340, 306 340, 306 260" />
        {/* User's shoulders */}
        <path d="M176 260 L176 340 L336 340 L336 260" />
      </g>
    </svg>
  );
};

export default UserTaskIcon;
