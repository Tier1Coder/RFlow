import React from 'react';

const BackIcon = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 -6 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g 
        id="Layer_1" 
        transform="translate(-4, -6)" 
        style={{ enableBackground: "new 0 0 32 32" }}
      >
        <g id="Arrow4Left">
          <polygon 
            points="28,14 11.7,14 19.7,6 14,6 4,16 14,26 19.7,26 11.7,18 28,18" 
            fill="#039C23" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
      <g 
        id="Layer_2" 
        transform="translate(16, 2)" 
        style={{ enableBackground: "new 0 0 16 16" }}
      >
        <g id="Remove_1_">
          <path 
            d="M15, 10L1, 10C0.4, 10 0, 9.6 0, 9L0, 7C0, 6.4 0.4, 6 1, 6L15, 6C15.6, 6 16, 6.4 16, 7L16, 9C16, 9.6 15.6, 10 15, 10z" 
            fill="#D11C1C" 
            style={{ fill: "#000000" }} 
          />
        </g>
      </g>
    </svg>
  );
};

const BackIconButton = ({ width, height, onClick, label, className }) => {
    return (
      <button 
        onClick={onClick} 
        className={className} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '10px', 
          border: 'none', 
          background: 'none', 
          cursor: 'pointer' 
        }}
      >
        <BackIcon width={width} height={height} />
        {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
      </button>
    );
};

export { BackIconButton };
