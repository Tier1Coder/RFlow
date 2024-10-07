import React from "react";

const NoneStartEventIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    preserveAspectRatio="none"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      color: 'currentColor',
    }}
  >
    <circle
      cx="256"
      cy="256"
      r="230"
      fill="none"
      stroke="currentColor"
      strokeWidth="7%"
    />
  </svg>
);

export default NoneStartEventIcon;